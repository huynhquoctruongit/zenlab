import { NEXT_PUBLIC_CMS } from '@/services/helpers'
import AudioPlayer from 'react-h5-audio-player'
const Listening = ({ audio }: { audio: string }) => {
  const audio_url = `${NEXT_PUBLIC_CMS}/assets/${audio}`
  return (
    <div className='w-full flex justify-center items-center mb-6 sticky top-0 bg-white z-10 player-container'>
      <AudioPlayer
        className='rounded-xl overflow-hidden shadow-md bg-gradient-to-r from-indigo-50 to-purple-50'
        autoPlay
        src={audio_url}
        showJumpControls={false}
        customVolumeControls={[]}
        customAdditionalControls={[]}
      />
    </div>
  )
}

export default Listening
