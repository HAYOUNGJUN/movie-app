import { FormEvent, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, Search } from 'lucide-react';
import './MainNavigation.style.css';

export default function MainNavigation() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate(`/movies?q=${inputRef.current!.value}`);
    event.currentTarget.reset();
  }

  return (
    <header className='flex flex-col md:flex-row md:justify-between p-6 bg-black items-center'>
      <nav className='flex flex-col items-center md:flex-row'>
        <div className='flex justify-between md:mx-4 md:mr-6 px-6 md:px-0 nav-icon'>
          <Menu
            className='md:hidden'
            onClick={() => setShowNavMenu((prevState) => !prevState)}
          />
          <NavLink to='/'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/440px-Netflix_2015_logo.svg.png'
              alt='Netflix'
              width={120}
            />
          </NavLink>
          <Search
            className='md:hidden'
            onClick={() => setShowSearchBox((prevState) => !prevState)}
          />
        </div>
        <ul
          className={`${
            showNavMenu ? 'flex' : 'hidden'
          } flex-col pt-8 md:pt-0 md:flex md:flex-row font-bold nav-list`}
        >
          <li className='px-4 py-2 rounded hover:bg-zinc-800'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='px-4 py-2 rounded hover:bg-zinc-800'>
            <NavLink to='/movies'>Movies</NavLink>
          </li>
        </ul>
      </nav>
      <div
        className={`md:mx-4 md:pt-0 pt-8 ${
          showSearchBox ? 'block' : 'hidden'
        } md:block search-box`}
      >
        <form onSubmit={handleSubmit}>
          <input
            className='rounded h-10 md:w-56 w-64 bg-zinc-700 placeholder:pl-2 border border-zinc-500'
            placeholder='Search'
            ref={inputRef}
          />
          <Button
            className='bg-red-600 rounded px-4 py-2 ml-2 font-bold hover:bg-red-500'
            type='submit'
          >
            Search
          </Button>
        </form>
      </div>
    </header>
  );
}
