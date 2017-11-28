var HoneycombURL = require('../modules/HoneycombURL.js')
const SearchStore = require('../store/SearchStore.js')

const introUrl = (collection) => {
  var url
  if (collection.description) {
    url = collectionUrl(collection) + '/intro'
  }
  return url
}

const aboutUrl = (collection) => {
  return collectionUrl(collection) + '/about'
}

const browseUrl = (collection) => {
  return collectionUrl(collection) + '/search?q='
}

const startSitePathUrl = (collection) => {
  var url
  if (collection.site_path && collection.site_path.length > 0) {
    url = collectionObjectUrl(collection.site_path[0])
  }
  return url
}

const itemUrl = (item) => {
  return collectionObjectUrl('items', item)
}

const collectionObjectUrl = (object) => {
  var collectionPath = window.location.pathname.match(/(?:\/[^\/]+){2}/)
  var typePath = ''
  switch (object.additionalType) {
    case 'https://github.com/ndlib/honeycomb/wiki/Page':
      typePath = 'pages'
      break
    case 'https://github.com/ndlib/honeycomb/wiki/Showcase':
      typePath = 'showcases'
      break
    default:
      typePath = ''
      break
  }
  var path = collectionPath + '/' + typePath + '/' + encodeURIComponent(object.id) + '/' + encodeURIComponent(object.slug)
  return path
}

const sectionObjectUrl = (object) => {
  var collectionPath = window.location.pathname.match(/(?:\/[^\/]+){5}/)
  return collectionPath + '/sections/' + encodeURIComponent(object.id)
}

const itemObjectUrl = (object) => {
  var collectionPath = window.location.pathname.match(/(?:\/[^\/]+){2}/)
  return collectionPath + '/items/' + encodeURIComponent(object.id)
}

const collectionUrl = (collection) => {
  if (collection.external_url) {
    return collection.external_url
  } else {
    return '/' + encodeURIComponent(collection.id) + '/' + encodeURIComponent(collection.slug)
  }
}

const remoteUrlBase = () => {
  return HoneycombURL() + '/v1/'
}

const remoteCollection = (collectionId) => {
  return remoteUrlBase() + 'collections/' + collectionId
}

const remoteShowcase = (showcaseId) => {
  return remoteUrlBase() + 'showcases/' + showcaseId
}

const remoteItem = (item) => {
  return remoteUrlBase() + 'items/' + item
}

const remoteSection = (section) => {
  return remoteUrlBase() + 'sections/' + section
}

module.exports = {
  introUrl,
  aboutUrl,
  browseUrl,
  startSitePathUrl,
  itemUrl,
  collectionObjectUrl,
  sectionObjectUrl,
  itemObjectUrl,
  collectionUrl,
  remoteUrlBase,
  remoteCollection,
  remoteShowcase,
  remoteItem,
  remoteSection,
}
