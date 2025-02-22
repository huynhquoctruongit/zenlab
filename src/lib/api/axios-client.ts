import axios from 'axios'
import { interceptorError } from './refresh-token'
import { getCookie } from 'react-use-cookie'

// axios for API CMS
export const AxiosClient = axios.create({
  baseURL: "https://cms.zenlab.edu.vn",
  headers: {
    'Content-Type': 'application/json'
  }
})

AxiosClient.interceptors.response.use(function (response: any) {
  return response
}, interceptorError)

AxiosClient.interceptors.request.use(function (config: any) {
  var token = getCookie('auth_token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

export const fetcherClient = (url: any, params: any) => {
  if (url) {
    if (typeof url === 'string') return AxiosClient.get(url, { params })
    else if (typeof url === 'object')
      return AxiosClient.get(url[0], { params: url[1] })
  }
}
export const optionsFetch = {
  fetcher: fetcherClient
}
export default AxiosClient
