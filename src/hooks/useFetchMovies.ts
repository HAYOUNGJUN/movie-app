import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/http';
import { type MovieResponse } from '../model/movieListsType';

async function fetchMovies(category: string): Promise<MovieResponse> {
  const response = await api.get(`/movie/${category}`);
  return response.data;
}

export function useFetchMoviesQuery(category: string) {
  return useQuery({
    queryKey: ['movie', { category }],
    queryFn: () => fetchMovies(category),
    // select: (result) => result.data,
  });
}
