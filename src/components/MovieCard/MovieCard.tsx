import { type Movie } from '../../model/types';
import { Card, CardContent } from '../ui/card';

import './MovieCard.style.css';

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card
      style={{
        backgroundImage:
          'url(' +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ')',
      }}
      className='movie-card border-none'
    >
      <CardContent className='flex items-center justify-center p-6'>
        {/* <span className='text-lg font-semibold'>{movie.title}</span> */}
      </CardContent>
    </Card>
  );
}
