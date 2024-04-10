import { GenresResponse } from '@/model/genresType';
import { api } from '@/utils/http';
import { useQuery } from '@tanstack/react-query';

async function fetchMovieGenres(): Promise<GenresResponse> {
  const response = await api.get(`/genre/movie/list`);
  return response.data;
}

export function useFetchGenres() {
  return useQuery({
    queryKey: ['movie-genre'],
    queryFn: fetchMovieGenres,
    select: (results) => results.genres,
    staleTime: 600000,
  });
}
