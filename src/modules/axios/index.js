import axios from 'axios'
import { resSuccess, resError, request } from './interceptors'

export default () => {
  axios.defaults.baseURL = 'http://127.0.0.1:9001/'
  axios.defaults.timeout = 200000
  axios.defaults.withCredentials = false
  axios.interceptors.request.use(request, resError)
  axios.interceptors.response.use(resSuccess, resError)
}
