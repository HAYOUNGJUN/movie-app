import { useFetchMovieDetailQuery } from '@/hooks/useFetchMovieDetail';
import { useParams } from 'react-router-dom';

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const { data } = useFetchMovieDetailQuery(+movieId!);
  console.log(data);

  return <>{data?.homepage}</>;
}
