import { MovieResponse } from '@/model/movieListsType';
import { api } from '@/utils/http';
import { useQuery } from '@tanstack/react-query';

async function fetchBySearchMovie(
  keyword: string | undefined,
  page: number | undefined
): Promise<MovieResponse> {
  let url: string;

  if (!keyword) {
    url = `/movie/popular?page=${page}`;
    // if (page) {
    // } else {
    //   url = `/movie/popular`;
    // }
  } else {
    url = `/search/movie?query=${keyword}&page=${page}`;
    // if (page) {
    // } else {
    //   url = `/search/movie?query=${keyword}`;
    // }
  }

  const response = await api.get(url);
  return response.data;
}

export function useSearchMovieQuery(
  keyword: string | undefined,
  page: number | undefined
) {
  return useQuery({
    queryKey: ['movie-search', { keyword, page }],
    queryFn: () => fetchBySearchMovie(keyword, page),
  });
}
