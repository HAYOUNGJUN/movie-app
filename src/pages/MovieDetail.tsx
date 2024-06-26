import LoadingIndicator from '@/components/LoadingIndicator';
import RecommendationsSection from '@/components/RecommendationsSection';
import ReviewSection from '@/components/ReviewSection';
import TrailerSection from '@/components/TrailerSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useFetchMovieDetailQuery } from '@/hooks/useFetchMovieDetail';
import { ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetailPage() {
  const [showReview, setShowReview] = useState(true);
  const { movieId } = useParams();
  const { data, isLoading, isError, error } = useFetchMovieDetailQuery(
    +movieId!
  );

  if (isLoading) {
    return <LoadingIndicator size={150} />;
  }

  if (isError) {
    return <p className='font-bold text-9xl'>{error.message}</p>;
  }

  return (
    <main className='py-16 md:mx-56'>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        <section className='flex justify-end'>
          <img
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`}
            alt={data?.title}
            width={450}
          />
        </section>
        <section className='md:mx-0 mx-4'>
          <section>
            {data?.genres.map((genre) => (
              <Badge
                key={genre.id}
                variant='destructive'
                className='text-sm px-4 py-1 mr-4'
              >
                {genre.name}
              </Badge>
            ))}
          </section>
          <section>
            <h1
              style={{
                fontFamily: 'Fraunces',
                fontStyle: 'normal',
                fontWeight: 400,
              }}
              className='text-7xl py-4'
            >
              {data?.title}
            </h1>
            <span className='text-2xl py-2'>{data?.tagline}</span>
          </section>
          <section className='flex py-4'>
            <div className='flex items-center mr-10'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/IMDb_Logo_Square.svg/256px-IMDb_Logo_Square.svg.png?20200218171646'
                alt='imdb logo'
                width={20}
                className='mr-2'
              />
              <span className='text-lg font-bold'>{data?.vote_average}</span>
            </div>
            <div className='flex items-center mr-10'>
              <ThumbsUpIcon size={20} className='mr-2' />
              <span className='text-lg font-bold'>{data?.popularity}</span>
            </div>
            {data?.adult ? (
              <Badge className='bg-red-600 italic'>+18</Badge>
            ) : (
              <Badge className='bg-lime-500 text-zinc-900 text-base font-extrabold'>
                All
              </Badge>
            )}
          </section>
          <Separator className='mb-6' />
          <section>{data?.overview}</section>
          <Separator className='my-6 bg-zinc-500' />
          <section>
            <div className='my-2'>
              <Badge
                variant='destructive'
                className='w-32 text-sm justify-center mr-2'
              >
                Budget
              </Badge>
              ${data?.budget.toLocaleString('en-US')}
            </div>
            <div className='my-2'>
              <Badge
                variant='destructive'
                className='w-32 text-sm justify-center mr-2'
              >
                Revenue
              </Badge>
              ${data?.revenue.toLocaleString('en-US')}
            </div>
            <div className='my-2'>
              <Badge
                variant='destructive'
                className='w-32 text-sm justify-center mr-2'
              >
                Release Day
              </Badge>
              {data?.release_date}
            </div>
            <div className='my-2'>
              <Badge
                variant='destructive'
                className='w-32 text-sm justify-center mr-2'
              >
                Time
              </Badge>
              {data?.runtime} m
            </div>
          </section>
          <Separator className='my-6 bg-zinc-500' />
          <section>
            <TrailerSection movieId={+movieId!} />
          </section>
        </section>
      </section>
      <section>
        <div className='py-8'>
          <Button
            variant='destructive'
            className='py-4 px-8 mx-4 text-xl'
            onClick={() => setShowReview(true)}
          >
            Review
          </Button>
          <Button
            variant='outline'
            className='py-4 px-8 text-xl'
            onClick={() => setShowReview(false)}
          >
            Related Movies
          </Button>
        </div>
        {showReview && <ReviewSection movieId={+movieId!} />}
        {!showReview && <RecommendationsSection movieId={+movieId!} />}
      </section>
    </main>
  );
}
