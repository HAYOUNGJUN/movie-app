import YouTube, { type YouTubeProps } from 'react-youtube';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useFetchMovieVideosQuery } from '@/hooks/useFetchMovieVideos';

type TrailerSectionProps = {
  movieId: number;
};

export default function TrailerSection({ movieId }: TrailerSectionProps) {
  const { data } = useFetchMovieVideosQuery(movieId);

  let trailerIndex = 0;
  if (data) {
    trailerIndex = data.findLastIndex((video) => video.type === 'Trailer');
  }

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '720',
    width: '1080',
    // playerVars: {
    //   // https://developers.google.com/youtube/player_parameters
    //   autoplay: 0,
    // },
  };

  if (data) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className='flex items-center'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/240px-YouTube_full-color_icon_%282017%29.svg.png'
              alt='youtube logo'
              width={30}
            />
            <span className='ml-2 text-rose-700 font-extrabold text-xl cursor-default'>
              Trailer
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className='md:max-w-[1280px] md:max-h-[800px] bg-zinc-900 flex justify-center'>
          <YouTube
            videoId={data[trailerIndex].key}
            opts={opts}
            onReady={onPlayerReady}
          />
        </DialogContent>
      </Dialog>
    );
  }
}
