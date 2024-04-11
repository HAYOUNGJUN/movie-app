import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/http';
import { Reviews } from '@/model/reviewsType';

async function fetchReviewsById(movieId: number): Promise<Reviews> {
  const reaponse = await api.get(`/movie/${movieId}/reviews`);
  return reaponse.data;
}

export function useFetchReviewsQuery(movieId: number) {
  return useQuery({
    queryKey: ['reviews', { movieId }],
    queryFn: () => fetchReviewsById(movieId),
    select: (result) => result.results,
  });
}
