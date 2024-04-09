import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation/MainNavigation';

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong...';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Not found';
      message = 'Could not find resources or page...';
    }
  }

  return (
    <>
      <MainNavigation />
      <div className='text-center mt-48'>
        <h1 className='font-bold text-8xl p-10'>{title}</h1>
        <p className='text-2xl'>{message}</p>
      </div>
    </>
  );
}
