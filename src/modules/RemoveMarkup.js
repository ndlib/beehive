const RemoveMarkup = (html) => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.innerText
}
export default RemoveMarkup
