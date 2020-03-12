module.exports = function (id, string) {
  if (id) {
    if (string === undefined) {
      string = 'item'
    }
    let path = window.location.pathname

    if (path.substr(-1) === '/') {
      path = path.substr(0, path.length - 1)
    }

    const reg = new RegExp('(' + string + ')=.*[^&]', 'i')
    let searchStr = window.location.search
    const searchReg = reg.exec(searchStr)

    if (searchStr.length > 0 && searchReg === null) {
      searchStr += '&' + string + '=' + id
    } else if (searchStr.length > 0 && searchReg !== null) {
      searchStr = searchStr.replace(reg, string + '=' + id)
    } else {
      searchStr = '?' + string + '=' + id
    }

    // eslint-disable-next-line no-restricted-globals
    history.pushState({}, '', path + searchStr)
  }
}
