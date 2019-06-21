import { Message } from 'element-ui'

let commonFileDownload = (file, fileName) => {
  let eleLink = document.createElement('a')
  eleLink.download = fileName
  eleLink.style.display = 'none'
  eleLink.href = window.URL.createObjectURL(new Blob([file]))
  document.body.appendChild(eleLink)
  eleLink.click()
  setTimeout(() => {
    document.body.removeChild(eleLink)
  }, 3000)
}

export const resSuccess = (response) => {
  setTimeout(() => {
    // store.dispatch('popLoading', response.config.url)
  }, 10)
  if (response.headers['xlt-file-name']) {
    commonFileDownload(response.data, response.headers['xlt-file-name'])
    response.data = { code: '0' }
    response.headers['content-type'] = 'text/json'
  }
  return response.data
}

export const resError = (error) => {
  setTimeout(() => {
    // store.dispatch('clearLoading')
  }, 1000)
  if (error.response.status === 404) {
    Message.error('Not　Found')
  } else {
    Message.error('Server Error')
  }
  return Promise.reject(error)
}

export const request = (config) => {
  // store.dispatch('pushLoading', config.baseURL + config.url)
  return config
}
