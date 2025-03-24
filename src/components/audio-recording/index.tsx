'use client'
import { useEffect } from 'react'
import { CirclePause, Mic } from 'lucide-react'
import dynamic from 'next/dynamic'
import usePractice from '@/components/practice/helper/store'
import useDetail from '../practice/helper/use-detail'

const AudioRecorder = dynamic(
  () => import('react-media-recorder').then(mod => mod.ReactMediaRecorder),
  { ssr: false }
)

const AudioRecording = () => {
  const {
    question,
    part,
    status,
    setStatus,
    setRecordingState,
    setAudio,
    setAudioBlob
  }: any = usePractice()
  const { data } = useDetail("")
  const questionList = data?.part[part]?.question
  const isSubmit = question === questionList?.length - 1

  const handleRecordingClick = (actions: any) => {
    const { startRecording, pauseRecording, stopRecording, resumeRecording } =
      actions
    if (isSubmit && status === 'recording') {
      stopRecording()
      setRecordingState('un-started')
      return
    }
    switch (status) {
      case 'idle':
        startRecording()
        setRecordingState('started')
        break
      case 'recording':
        pauseRecording()
        setRecordingState('un-started')
        break
      case 'paused':
        resumeRecording()
        setRecordingState('started')
        break
      default:
        break
    }
  }

  const renderRecordingButton = (status: string) => {
    return status === 'recording' ? (
      <div className='flex items-center justify-center gap-2 cursor-pointer'>
        <CirclePause color="red" size={120} />
      </div>
    ) : (
      <div className='flex items-center justify-center gap-2 cursor-pointer'>
        <Mic color="green" size={120} />
      </div>
    )
  }

  return (
    <AudioRecorder
      render={({
        status,
        startRecording,
        stopRecording,
        resumeRecording,
        pauseRecording,
        mediaBlobUrl
      }) => {
        useEffect(() => {
          setStatus(status)
          setAudio(mediaBlobUrl)

          // Get blob file when mediaBlobUrl changes
          if (mediaBlobUrl) {
            fetch(mediaBlobUrl)
              .then(response => response.blob())
              .then(blob => {
                setAudioBlob(blob)
              })
          }
        }, [status, mediaBlobUrl])

        return (
          <div
            onClick={() =>
              handleRecordingClick({
                startRecording,
                pauseRecording,
                stopRecording,
                resumeRecording
              })
            }
          >
            {renderRecordingButton(status)}
          </div>
        )
      }}
      // mediaRecorderOptions={{
      //   mimeType: 'audio/wav'
      // }}
    />
  )
}

export default AudioRecording
