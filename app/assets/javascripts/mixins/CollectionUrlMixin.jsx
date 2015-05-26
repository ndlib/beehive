var CollectionUrlMixin = {
  introUrl: function(collection) {
    var url;
    if (collection.description) {
      url = this.collectionUrl(collection) + '/intro'
    }
    return url;
  },

  sectionUrl: function(section) {
    return this.collectionObjectUrl('sections', section);
  },

  showcaseUrl: function(showcase) {
    return this.collectionObjectUrl('showcases', showcase);
  },

  firstShowcaseUrl: function(showcase) {
    var url;
    if(this.props.collection.showcases){
      if(this.props.collection.showcases.length > 0) {
        url = this.showcaseUrl(this.props.collection.showcases[0]);
      }
    }
    return url;
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
