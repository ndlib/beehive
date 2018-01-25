const RemoveMarkup = (html) => {
  let div = document.createElement('div')
  div.innerHTML = html
  return div.innerText
}
export default RemoveMarkup
