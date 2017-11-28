module.exports = function (title, doNotConcat) {
  if(title) {
    if(doNotConcat) {
      document.title = title
    } else {
      document.title = title + ' | Digital Exhibits and Collections'
    }

  }
  else {
    document.title = 'Digital Exhibits and Collections'
  }
  return
}
