import { create } from 'zustand'
import useSWR from 'swr'
import { fetcherClient } from '@/lib/api/axios-client'
import { useParams } from 'next/navigation'

export const useAnswerList = create(set => ({
  answer_list: [],
  setAnswerList: (state: any) => set(() => ({ answer_list: state }))
}))

export const useAnswer = () => {
  const params = useParams()
  const id = params.id
  const query = {
    fields: ['*', 'quiz.*', 'quiz.part.*', 'quiz.part.question.*', 'review.*'],
    filter: { id: { _eq: id } }
  }

  const url = ['/items/answer', query]
  const { data, mutate } = useSWR(url, fetcherClient)

  return {
    data: data?.data?.data?.[0],
    mutate
  }
}