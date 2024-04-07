import { useFetchMoviesQuery } from '../../hooks/useFetchMovies';
import LoadingIndicator from '../LoadingIndicator';
import './Banner.style.css';

export default function Banner() {
  const { data, isLoading, isError, error } = useFetchMoviesQuery('popular');
  const randomIndex = Math.floor(Math.random() * 20);
  // console.log(data);

  if (isLoading) {
    return <LoadingIndicator size={150} />;
  }

  if (isError) {
    return <p className='font-bold text-9xl'>{error.message}</p>;
  }

  return (
    <div
      className='banner'
      style={{
        backgroundImage:
          'url(' +
          `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${
            data!.results[randomIndex].backdrop_path
          }` +
          ')',
      }}
    >
      <div className='banner-info cursor-default'>
        <h1 className='text-red-600 text-4xl font-bold mb-4'>
          {data!.results[randomIndex].title}
        </h1>
        <p className='text-lg'>{data!.results[randomIndex].overview}</p>
      </div>
    </div>
  );
}
