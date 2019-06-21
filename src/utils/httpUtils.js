import axios from 'axios'
import { Message } from 'element-ui'

let instance = (method, url, params, data, header) => {
  return axios({
    method: method,
    url: url,
    data: data,
    params: params,
    header: header
  })
}
let errorCallBack = (error) => {
  Message.error(error.msg)
}

export default {
  get (url, params, header) {
    return new Promise((resolve, reject) => {
      instance('get', url, params, header).then((response) => {
        if (response.code === '0') {
          resolve(response)
        } else {
          errorCallBack(response)
        }
      })
    })
  },
  post (url, params, data, header) {
    return new Promise((resolve, reject) => {
      instance('post', url, params, data, header).then((response) => {
        if (response.code === '0') {
          resolve(response)
        } else {
          errorCallBack(response)
        }
      })
    })
  },
  put (url, params, data, header) {
    return new Promise((resolve, reject) => {
      instance('put', url, params, data, header).then((response) => {
        if (response.code === '0') {
          resolve(response)
        } else {
          errorCallBack(response)
        }
      })
    })
  },
  delete (url, params, data, header) {
    return new Promise((resolve, reject) => {
      instance('delete', url, params, data, header).then((response) => {
        if (response.code === '0') {
          resolve(response)
        } else {
          errorCallBack(response)
        }
      })
    })
  }
}
