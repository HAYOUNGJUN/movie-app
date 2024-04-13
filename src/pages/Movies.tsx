import LoadingIndicator from '@/components/LoadingIndicator';
import MovieCard from '@/components/MovieCard/MovieCard';
import PaginationSection from '@/components/PaginationSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { useFetchGenres } from '@/hooks/useFetchGenres';
import { useSearchMovieQuery } from '@/hooks/useSearchMovie';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [searchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState(1);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState({
    yearFilter: [1990, 2024],
    scoreFilter: [0, 10],
    genresFilter: 0,
  });
  const keyword = searchParams.get('q');

  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword || undefined,
    currPage || undefined
  );
  const { data: genresData } = useFetchGenres();

  const movieData = data?.results;
  // console.log(movieData);

  useEffect(() => {
    setCurrPage(1);
  }, [keyword]);

  if (movieData) {
    if (sort === 'popularityDesc') {
      movieData.sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity));
    } else if (sort === 'popularityAsc') {
      movieData.sort((a, b) => parseInt(a.popularity) - parseInt(b.popularity));
    } else if (sort === 'releaseDayDesc') {
      movieData.sort(
        (a, b) => +new Date(b.release_date) - +new Date(a.release_date)
      );
    } else if (sort === 'releaseDayAsc') {
      movieData.sort(
        (a, b) => +new Date(a.release_date) - +new Date(b.release_date)
      );
    } else if (sort === 'voteDesc') {
      movieData.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sort === 'voteAsc') {
      movieData.sort((a, b) => a.vote_average - b.vote_average);
    }
  }

  let filteredMovieData = movieData;

  if (!filter.genresFilter) {
    filteredMovieData = movieData
      ?.filter(
        (movie) =>
          +movie.release_date.split('-')[0] >= filter.yearFilter[0] &&
          +movie.release_date.split('-')[0] <= filter.yearFilter[1]
      )
      .filter(
        (movie) =>
          movie.vote_average >= filter.scoreFilter[0] &&
          movie.vote_average <= filter.scoreFilter[1]
      );
  } else {
    filteredMovieData = movieData
      ?.filter(
        (movie) =>
          +movie.release_date.split('-')[0] >= filter.yearFilter[0] &&
          +movie.release_date.split('-')[0] <= filter.yearFilter[1]
      )
      .filter(
        (movie) =>
          movie.vote_average >= filter.scoreFilter[0] &&
          movie.vote_average <= filter.scoreFilter[1]
      )
      .filter((movie) => movie.genre_ids.includes(filter.genresFilter));
  }

  if (isLoading) {
    return <LoadingIndicator size={150} />;
  }

  if (isError) {
    return <p className='font-bold text-9xl'>{error.message}</p>;
  }

  return (
    <main className='grid grid-cols-1 md:grid-cols-3 gap-4 p-10 mx-auto'>
      <section className='flex justify-center md:justify-start md:flex-col md:items-end md:mx-8'>
        <div className='mx-4 md:mx-0'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='text-2xl p-8 border-2 border-zinc-100 my-2'
              >
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-72 bg-zinc-800 text-white'>
              <DropdownMenuLabel className='font-bold text-lg'>
                Sort by
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value='popularityDesc'>
                  Popularity(Desc)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='popularityAsc'>
                  Popularity(Asc)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='releaseDayDesc'>
                  Release Day(Desc)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='releaseDayAsc'>
                  Release Day(Asc)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='voteDesc'>
                  Vote(Desc)
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='voteAsc'>
                  Vote(Asc)
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='text-2xl p-8 border-2 border-zinc-100 my-2'
              >
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-72 bg-zinc-800 text-white'>
              <DropdownMenuLabel className='font-bold text-lg'>
                Filter
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='flex flex-col'>
                <span className='p-4'>Year Filter</span>
                <span className='pb-4'>
                  From{' '}
                  <strong className='font-extrabold text-lg'>
                    {filter.yearFilter[0]}
                  </strong>{' '}
                  To{' '}
                  <strong className='font-extrabold text-lg'>
                    {filter.yearFilter[1]}
                  </strong>
                </span>
                <Slider
                  defaultValue={[filter.yearFilter[0], filter.yearFilter[1]]}
                  max={2024}
                  min={1990}
                  step={1}
                  onValueChange={(e) =>
                    setFilter((prevState) => {
                      return { ...prevState, yearFilter: e };
                    })
                  }
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='flex flex-col'>
                <span className='p-4'>IBM Score Filter</span>
                <span className='pb-4'>
                  From{' '}
                  <strong className='font-extrabold text-lg'>
                    {filter.scoreFilter[0]}
                  </strong>{' '}
                  To{' '}
                  <strong className='font-extrabold text-lg'>
                    {filter.scoreFilter[1]}
                  </strong>
                </span>
                <Slider
                  defaultValue={[filter.scoreFilter[0], filter.scoreFilter[1]]}
                  max={10}
                  step={1}
                  onValueChange={(e) =>
                    setFilter((prevState) => {
                      return { ...prevState, scoreFilter: e };
                    })
                  }
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='flex flex-col'>
                <span>Genres</span>
                <div>
                  {genresData?.map((genere) => (
                    <Badge
                      key={genere.id}
                      className='p-2'
                      onClick={() =>
                        setFilter((prevState) => {
                          return { ...prevState, genresFilter: genere.id };
                        })
                      }
                    >
                      {genere.name}
                    </Badge>
                  ))}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      <section className='col-span-2'>
        <ul className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {filteredMovieData?.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
        <PaginationSection
          totalPages={data!.total_pages}
          currentPage={currPage}
          setCurrentPage={setCurrPage}
          className='p-8'
        />
      </section>
    </main>
  );
}
