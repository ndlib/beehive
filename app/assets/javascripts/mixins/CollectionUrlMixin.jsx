var CollectionUrlMixin = {

  sectionUrl: function(section) {
    return this.collectionObjectUrl('sections', section);
  },

  showcaseUrl: function(showcase) {
    return this.collectionObjectUrl('showcases', showcase);
  },

  itemUrl: function(item) {
    return this.collectionObjectUrl('items', item);
  },

  collectionObjectUrl: function(basePath, object) {
    var collectionPath = window.location.pathname.match(/(?:\/[^\/]+){2}/);
    var path = collectionPath + '/' + basePath + '/' + encodeURIComponent(object.id) + '/' + encodeURIComponent(object.slug);
    return path;
  },

  collectionUrl: function(collection) {
    return '/' + encodeURIComponent(collection.id) + '/' + encodeURIComponent(collection.slug);
  },
}

module.exports = CollectionUrlMixin;
