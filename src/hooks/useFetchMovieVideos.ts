import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/http';
import { type MovieVideo } from '@/model/movieVideoType';

async function fetchMovieVideosById(movieId: number): Promise<MovieVideo> {
  const reaponse = await api.get(`/movie/${movieId}/videos`);
  return reaponse.data;
}

export function useFetchMovieVideosQuery(movieId: number) {
  return useQuery({
    queryKey: ['movie-videos', { movieId }],
    queryFn: () => fetchMovieVideosById(movieId),
    select: (result) => result.results,
  });
}
