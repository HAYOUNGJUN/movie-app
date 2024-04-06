import { useFetchMoviesQuery } from '../../hooks/useFetchMovies';
import LoadingIndicator from '../LoadingIndicator';
import MovieCard from '../MovieCard/MovieCard';
import './MovieSlide.style.css';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type MovieSlideProps = {
  category: string;
};

export default function MovieSlide({ category }: MovieSlideProps) {
  const { data, isLoading, isError, error } = useFetchMoviesQuery(category);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  if (isLoading) {
    return <LoadingIndicator size={150} />;
  }

  if (isError) {
    return <p className='font-bold text-9xl'>{error.message}</p>;
  }

  return (
    <div>
      <h3 className='text-2xl py-6 px-20'>
        {category
          .replace(/_/g, ' ')
          .toLowerCase()
          .replace(/(^|\s)\S/g, (L) => L.toUpperCase())}{' '}
        Movies
      </h3>
      <div className='flex justify-center'>
        <Carousel
          plugins={[plugin.current]}
          className='w-full max-w-7xl'
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {data!.results.map((movie) => (
              <CarouselItem
                key={movie.id}
                className='basis-1 md:basis-1/2 lg:basis-1/5 carousel-container rounded-lg'
              >
                <div className='p-1'>
                  <MovieCard movie={movie} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
