var CollectionUrlMixin = {
  introUrl: function(collection) {
    var url;
    if (collection.description) {
      url = this.collectionUrl(collection) + '/intro/'
    }
    return url;
  },

  aboutUrl: function(collection) {
    return this.collectionUrl(collection) + '/about/';
  },

  browseUrl: function(collection) {
    return this.collectionUrl(collection) + '/search?q=';
  },

  startSitePathUrl: function() {
    var url;
    if(this.props.collection.site_path && this.props.collection.site_path.length > 0) {
      url = this.collectionObjectUrl(this.props.collection.site_path[0]);
    }
    return url;
  },

  itemUrl: function(item) {
    return this.collectionObjectUrl('items', item);
  },

  collectionObjectUrl: function(object) {
    var collectionPath = window.location.pathname.match(/(?:\/[^\/]+){2}/);
    var typePath = ""
    switch(object.additionalType){
      case "https://github.com/ndlib/honeycomb/wiki/Page":
        typePath = "pages";
        break;
      case "https://github.com/ndlib/honeycomb/wiki/Showcase":
        typePath = "showcases";
        break;
      case "https://github.com/ndlib/honeycomb/wiki/Section":
        typePath = "sections";
        break;
      default:
        typePath = "";
        break;
    }
    var path = collectionPath + '/' + typePath + '/' + encodeURIComponent(object.id) + '/' + encodeURIComponent(object.slug);
    return path;
  },

  collectionUrl: function(collection) {
    if(collection.external_url) {
        return collection.external_url;
    } else {
      return '/' + encodeURIComponent(collection.id) + '/' + encodeURIComponent(collection.slug);
    }
  },

  remoteUrlBase: function() {
    var environmentUrl = window.location.origin;
    var returnUrl;
    if (environmentUrl.indexOf('pprd') > -1) {
      returnUrl = 'http://honeycombpprd-vm.library.nd.edu/v1/'
    }
    else if(environmentUrl.indexOf('localhost') > -1) {
      returnUrl = 'http://localhost:3017/v1/';
    }
    else {
      returnUrl = 'http://honeycomb.library.nd.edu/v1/'
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
