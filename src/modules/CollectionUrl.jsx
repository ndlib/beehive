const HoneycombURL = require('../modules/HoneycombURL.js')

const introUrl = (collection) => {
  let url
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
  let url
  if (collection.site_path && collection.site_path.length > 0) {
    url = collectionObjectUrl(collection.site_path[0])
  }
  return url
}

const itemUrl = (item) => {
  return collectionObjectUrl('items', item)
}

const collectionObjectUrl = (object) => {
  const collectionPath = window.location.pathname.match(/(?:\/[^\/]+){2}/) // eslint-disable-line no-useless-escape
  let typePath = ''
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
  const path = collectionPath +
    '/' + typePath +
    '/' + encodeURIComponent(object.id) +
    '/' + encodeURIComponent(object.slug)
  return path
}

const sectionObjectUrl = (object) => {
  const collectionPath = window.location.pathname.match(/(?:\/[^\/]+){5}/) // eslint-disable-line no-useless-escape
  return collectionPath + '/sections/' + encodeURIComponent(object.id)
}

const itemObjectUrl = (object) => {
  const collectionPath = window.location.pathname.match(/(?:\/[^\/]+){2}/) // eslint-disable-line no-useless-escape
  const itemId = object.id ? encodeURIComponent(object.id) : object['@id'].substr(object['@id'].lastIndexOf('/') + 1)
  return collectionPath + '/items/' + itemId
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

export default {
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
