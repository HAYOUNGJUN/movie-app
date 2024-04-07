import LoadingIndicator from '@/components/LoadingIndicator';
import MovieCard from '@/components/MovieCard/MovieCard';
import { useSearchMovieQuery } from '@/hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q');

  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword || undefined
  );
  console.log(data?.results);

  if (isLoading) {
    return <LoadingIndicator size={150} />;
  }

  if (isError) {
    return <p className='font-bold text-9xl'>{error.message}</p>;
  }

  return (
    <main className='grid grid-cols-3 gap-4 p-10 mx-auto'>
      <section>필터</section>
      <section className='col-span-2'>
        <ul className='grid grid-cols-4 gap-4'>
          {data?.results.map((movie) => (
            <li>
              <MovieCard key={movie.id} movie={movie} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
