import httpUtils from '@/utils/httpUtils'

const BASE_URL = '/api/convert'

export default {
  getConverts (param) {
    return httpUtils.get(`${BASE_URL}/getConverts`, param)
  },
  add (param) {
    return httpUtils.get(`${BASE_URL}/add`, param)
  },
  search (param) {
    return httpUtils.get(`${BASE_URL}/search`, param)
  }
}
