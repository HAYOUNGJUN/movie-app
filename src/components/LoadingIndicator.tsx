import { ClipLoader } from 'react-spinners';

export default function LoadingIndicator({ ...props }) {
  return (
    <div className='text-center p-10'>
      <ClipLoader color='red' speedMultiplier={0.5} {...props} />
    </div>
  );
}
