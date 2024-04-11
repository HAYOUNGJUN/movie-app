import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/http';
import { type MovieResponse } from '../model/movieListsType';

async function fetchRecommendations(movieId: number): Promise<MovieResponse> {
  const response = await api.get(`/movie/${movieId}/recommendations`);
  return response.data;
}

export function useFetchRecommendationsQuery(movieId: number) {
  return useQuery({
    queryKey: ['movie-recommendations', { movieId }],
    queryFn: () => fetchRecommendations(movieId),
    // select: (result) => result.results,
  });
}
