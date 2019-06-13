export default {
  getIndexOf (list, key, source) {
    for (let i = 0; i < list.length; i++) {
      if (list[i][key] === source) {
        return i
      }
    }
    return -1
  },
  getSameItemNum (list, key, source) {
    let result = 0
    for (let i = 0; i < list.length; i++) {
      if (list[i][key] === source) {
        result++
      }
    }
    return result
  }
}
