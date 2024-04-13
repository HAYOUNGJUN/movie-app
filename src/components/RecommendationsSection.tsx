import { useFetchRecommendationsQuery } from '@/hooks/useFetchRecommendations';
import MovieCard from './MovieCard/MovieCard';

type RecommendationsSectionProps = {
  movieId: number;
};

export default function RecommendationsSection({
  movieId,
}: RecommendationsSectionProps) {
  const { data } = useFetchRecommendationsQuery(movieId);
  // console.log(data);
  return (
    <div className='grid grid-cols-1 place-items-center md:grid-cols-4 gap-4'>
      {data?.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
