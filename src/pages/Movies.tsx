import LoadingIndicator from '@/components/LoadingIndicator';
import MovieCard from '@/components/MovieCard/MovieCard';
import PaginationSection from '@/components/PaginationSection';
import { useSearchMovieQuery } from '@/hooks/useSearchMovie';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [searchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState(1);

  const keyword = searchParams.get('q');

  useEffect(() => {
    setCurrPage(1);
  }, [keyword]);

  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword || undefined,
    currPage || undefined
  );
  // console.log(data);

  if (isLoading) {
    return <LoadingIndicator size={150} />;
  }

  if (isError) {
    return <p className='font-bold text-9xl'>{error.message}</p>;
  }

  return (
    <main className='grid grid-cols-1 md:grid-cols-3 gap-4 p-10 mx-auto'>
      <section>필터</section>
      <section className='col-span-2'>
        <ul className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {data?.results.map((movie) => (
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
