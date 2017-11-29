console.log(process.env.NODE_ENV)
module.exports = function () {
  if (process.env.NODE_ENV === 'production') {
    return 'https://dave.library.nd.edu'
  } else if (process.env.NODE_ENV === 'preproduction') {
    return 'https://davepprd.library.nd.edu'
  } else {
    return 'http://localhost:3024'
  }
}
