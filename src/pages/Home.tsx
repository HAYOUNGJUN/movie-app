import Banner from '../components/Banner/Banner';
import MovieSlide from '../components/MovieSlide/MovieSlide';

export default function HomePage() {
  return (
    <main>
      <Banner />
      <MovieSlide category='popular' />
      <MovieSlide category='top_rated' />
      <MovieSlide category='now_playing' />
      <MovieSlide category='upcoming' />
    </main>
  );
}
