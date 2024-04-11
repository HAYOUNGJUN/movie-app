import { ChevronsUpDown } from 'lucide-react';

import { type ReviewsResults } from '@/model/reviewsType';
import { useState } from 'react';

type ReviewItemProps = {
  reviewData: ReviewsResults;
};

export default function ReviewItem({ reviewData: data }: ReviewItemProps) {
  const [hideContent, setHideContent] = useState(true);
  const overLimit = data.content.length > 350;

  return (
    <article>
      <div className='flex items-center justify-between px-4'>
        <h4 className='font-bold text-xl py-1'>{data.author}</h4>
        {overLimit && (
          <ChevronsUpDown
            size={20}
            onClick={() => setHideContent((prev) => !prev)}
          />
        )}
      </div>
      <span className='py-1'>
        {data.content.slice(0, 350)}
        {overLimit && hideContent && '...'}
        {!hideContent && data.content.slice(350, -1)}
      </span>
    </article>
  );
}
