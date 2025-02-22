import { create } from 'zustand'

const useAnswerList = create(set => ({
  answer_list: [],
  setAnswerList: (state: any) => set(() => ({ answer_list: state }))
}))
export default useAnswerList