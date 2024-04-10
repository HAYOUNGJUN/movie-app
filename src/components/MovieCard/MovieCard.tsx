import { type Movie } from '../../model/movieListsType';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { ThumbsUpIcon } from 'lucide-react';

import './MovieCard.style.css';
import { useFetchGenres } from '@/hooks/useFetchGenres';
import { useNavigate } from 'react-router-dom';

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { data: genreData } = useFetchGenres();
  const navigate = useNavigate();

  function showGenreName(genreIdList: number[]) {
    if (!genreData) return [];

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj!.name;
    });

    return genreNameList;
  }

  return (
    <Card
      style={
        movie.poster_path
          ? {
              backgroundImage:
                'url(' +
                `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
                ')',
            }
          : {
              backgroundImage:
                'url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png)',
            }
      }
      className='movie-card border-none'
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <CardContent className='flex flex-col justify-between p-6 pt-12 overlay'>
        <div>
          <span className='text-zinc-100 font-semibold text-2xl overlay-title'>
            {movie.title}
          </span>
          <Separator className='my-2' />
          {showGenreName(movie.genre_ids).map((genre, index) => (
            <Badge key={index} variant='destructive' className='m-1 rounded-md'>
              {genre}
            </Badge>
          ))}
        </div>
        <div className='flex justify-between items-center text-sm'>
          <div className='flex items-center'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/IMDb_Logo_Square.svg/256px-IMDb_Logo_Square.svg.png?20200218171646'
              alt='imdb logo'
              width={16}
              className='mr-1'
            />
            <span>{movie.vote_average}</span>
          </div>
          <div className='flex items-center'>
            <ThumbsUpIcon size={16} className='mr-1' />
            <span>{movie.popularity}</span>
          </div>
          {movie.adult ? (
            <Badge className='bg-red-600 italic'>+18</Badge>
          ) : (
            <Badge className='bg-lime-500 text-zinc-900 flex justify-center items-center font-extrabold'>
              All
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
