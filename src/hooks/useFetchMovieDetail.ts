import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/http';
import { MovieDetail } from '@/model/movieDetailsType';

async function fetchMovieById(movieId: number): Promise<MovieDetail> {
  const reaponse = await api.get(`/movie/${movieId}`);
  return reaponse.data;
}

export function useFetchMovieDetailQuery(movieId: number) {
  return useQuery({
    queryKey: ['movie-detail', { movieId }],
    queryFn: () => fetchMovieById(movieId),
  });
}
