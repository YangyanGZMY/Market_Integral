import httpUtils from '@/utils/httpUtils'

const BASE_URL = '/api/log'

export default {
  getLogs (param) {
    return httpUtils.get(`${BASE_URL}/getLogs`, param)
  },
  add (param) {
    return httpUtils.post(`${BASE_URL}/add`, param)
  }
}
