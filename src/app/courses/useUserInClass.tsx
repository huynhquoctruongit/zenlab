// https://cms.zenlab.edu.vn/users?limit=25&fields[]=id&fields[]=avatar.modified_on&fields[]=avatar.type&fields[]=avatar.filename_disk&fields[]=avatar.storage&fields[]=avatar.id&fields[]=first_name&fields[]=last_name&fields[]=email&sort[]=email&page=1&filter[_and][0][$FOLLOW(class_directus_users_1,directus_users_id)][_none][class_id][_eq]=1

'use client'
import useSWR from 'swr'
import { fetcherClient } from '@/lib/api/axios-client'
import { useParams } from 'next/navigation'

const useUserInClass = () => {
  const params = useParams()
  const id = params.id
  const query = {
    fields: "*",
    filter: { id: { _eq: id } }
  }
  const url = ['/items/quiz?fields=*']
  const { data } = useSWR(url, fetcherClient)

  return {
    data: data?.data?.data?.[0]
  }
}

export default useUserInClass
