export default function (url) {
  let href = url || window.location.href
  const facets = []
  const reg = new RegExp('(facet\\[.*?\\]=[^&#]*)', 'i')
  let facetReg = reg.exec(href)
  while (facetReg !== null) {
    const string = facetReg[0].replace('facet[', '')
    const arr = string.split(']=')
    facets.push({ name: arr[0], value: arr[1] })
    href = href.replace(facetReg[0], '')
    facetReg = reg.exec(href)
  }
  return facets.length > 0 ? facets : null
}
