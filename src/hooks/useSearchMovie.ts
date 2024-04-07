import { MovieResponse } from '@/model/types';
import { api } from '@/utils/http';
import { useQuery } from '@tanstack/react-query';

async function fetchBySearchMovie(keyword?: string): Promise<MovieResponse> {
  let url: string;

  if (!keyword) {
    url = '/movie/popular';
  } else {
    url = `/search/movie?query=${keyword}`;
  }

  const response = await api.get(url);
  return response.data;
}

export function useSearchMovieQuery(keyword?: string) {
  return useQuery({
    queryKey: ['movie-search', keyword],
    queryFn: () => fetchBySearchMovie(keyword),
  });
}
