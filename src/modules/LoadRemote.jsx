const $ = require('jquery')
const withCallback = (url, callback) => {
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (result) {
      callback(result)
    },
    error: function (request, status, thrownError) {
      console.log(url, thrownError)
      if (window.location.hostname !== 'localhost') {
        window.location = window.location.origin + '/404'
      } else {
        alert('404 Redirect prevented')
      }
    },
  })
}

const loadRemoteCollection = (url, callback) => {
  withCallback(url, callback)
}

module.exports = {
  withCallback,
  loadRemoteCollection,
}
