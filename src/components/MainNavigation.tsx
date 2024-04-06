import { NavLink } from 'react-router-dom';
import { Button } from './ui/button';

export default function MainNavigation() {
  return (
    <header className='flex justify-between p-6 bg-black items-center'>
      <nav className='flex items-center'>
        <div className='mx-4 mr-6'>
          <NavLink to='/'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/440px-Netflix_2015_logo.svg.png'
              alt='Netflix'
              width='120'
            />
          </NavLink>
        </div>
        <ul className='flex font-bold'>
          <li className='px-4 py-2 rounded hover:bg-zinc-800'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='px-4 py-2 rounded hover:bg-zinc-800'>
            <NavLink to='/movies'>Movies</NavLink>
          </li>
        </ul>
      </nav>
      <div className='mx-4'>
        <input
          className='rounded h-10 w-56 bg-zinc-700 placeholder:pl-2 border border-zinc-500'
          placeholder='Search'
        />
        <Button className='bg-red-600 rounded px-4 py-2 ml-2 font-bold hover:bg-red-500'>
          Search
        </Button>
      </div>
    </header>
  );
}
