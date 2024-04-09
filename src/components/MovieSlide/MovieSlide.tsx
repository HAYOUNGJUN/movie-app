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
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  if (isLoading) {
    return <LoadingIndicator size={150} />;
  }

  if (isError) {
    return <p className='font-bold text-9xl'>{error.message}</p>;
  }

  return (
    <div>
      <h3 className='text-2xl font-bold pt-4 md:pt-6 px-4 md:px-20'>
        {category
          .replace(/_/g, ' ')
          .toLowerCase()
          .replace(/(^|\s)\S/g, (L) => L.toUpperCase())}{' '}
        Movies
      </h3>
      <div className='flex justify-center'>
        <Carousel
          plugins={[plugin.current]}
          className='w-full max-w-xs md:max-w-7xl'
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {data!.results.map((movie) => (
              <CarouselItem
                key={movie.id}
                className='flex items-center justify-center md:basis-1/3 lg:basis-1/5 carousel-container rounded-lg'
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
