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
  
  remoteUrlBase: function() {
    var environmentUrl = window.location.origin;
    var returnUrl;
    if (environmentUrl.indexOf('pprd') > -1) {
      returnUrl = 'http://beehivepprd-vm.library.nd.edu/v1/'
    }
    else if(environmentUrl.indexOf('localhost') > -1) {
      returnUrl = 'http://localhost:3017/v1/';
    }
    else {
      returnUrl = 'http://beehive.library.nd.edu/v1/'
    }
    return returnUrl;
  },

  remoteItem: function(item) {
    return this.remoteUrlBase() + '/items/' + item;
  },

  remoteSection: function(section) {
    return this.remoteUrlBase() + '/sections/' + section;
  }

}

module.exports = CollectionUrlMixin;
