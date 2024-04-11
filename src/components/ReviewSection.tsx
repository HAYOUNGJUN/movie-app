import { useFetchReviewsQuery } from '@/hooks/useFetchReviews';
import LoadingIndicator from './LoadingIndicator';
import ReviewItem from './ReviewItem';
import { Separator } from './ui/separator';

type ReviewSectionProps = {
  movieId: number;
};

export default function ReviewSection({ movieId }: ReviewSectionProps) {
  const { data, isLoading, isError, error } = useFetchReviewsQuery(movieId);

  if (isLoading) {
    return <LoadingIndicator size={150} />;
  }

  if (isError) {
    return <p className='font-bold text-9xl'>{error.message}</p>;
  }

  if (data) {
    return (
      <div className='border-2 border-zinc-200 p-8 ml-4'>
        {data.map((review) => (
          <div key={review.id}>
            <ReviewItem reviewData={review} />
            <Separator className='mb-4 mt-2' />
          </div>
        ))}
      </div>
    );
  }
}
