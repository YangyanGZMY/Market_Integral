import httpUtils from '@/utils/httpUtils'

const BASE_URL = '/api/member'

export default {
  autoComplete (param) {
    return httpUtils.get(`${BASE_URL}/autocomplete`, param)
  },
  checkPhone (param) {
    return httpUtils.get(`${BASE_URL}/checkPhone`, param)
  },
  add (param) {
    return httpUtils.post(`${BASE_URL}/add`, param)
  }
}
