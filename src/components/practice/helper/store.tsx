import { create } from 'zustand'

const usePractice = create(set => ({
  status: 'idle',
  part: 0,
  question: 0,
  recordingState: '',
  audio: null,
  audioBlob: null,
  setPart: (state: any) => set(() => ({ part: state })),
  setStatus: (state: any) => set(() => ({ status: state })),
  setQuestion: (state: any) => set(() => ({ question: state })),
  setRecordingState: (state: any) => set(() => ({ recordingState: state })),
  setAudio: (state: any) => set(() => ({ audio: state })),
  setAudioBlob: (state: any) => set(() => ({ audioBlob: state }))
}))

export default usePractice
