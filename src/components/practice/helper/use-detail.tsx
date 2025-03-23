'use client'
import useSWR from 'swr'
import { fetcherClient } from '@/lib/api/axios-client'
import { useParams } from 'next/navigation'

const useDetail = (quizId: string) => {
  const params = useParams()
  const id = quizId ? quizId : params.id
  const query = {
    fields: ['*', 'part.*', 'part.question.*'],
    filter: { id: { _eq: id } }
  }
  const url = ['/items/quiz', query]
  const { data } = useSWR(url, fetcherClient)

  return {
    data: data?.data?.data?.[0]
  }
}

export default useDetail
