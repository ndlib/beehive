var SearchUrlMixin = {
  initSearchStore: function() {
    if(!window.searchStore) {
      window.searchStore = {};
    }
  },

  searchUrl: function(collection) {
    var url = window.location.origin
      + "/" + collection.id
      + "/" + collection.slug
      + "/search?q=" + window.searchStore.searchTerm;
    if(window.searchStore.facetOption) {
      if(window.searchStore.facetOption.name) {
        url += "&facet[" + window.searchStore.facetOption.name + "]=" + window.searchStore.facetOption.value;
      }
    }
    if(window.searchStore.sortOption) {
      url += "&sort=" + window.searchStore.sortOption;
    }
    + "&sort=" + window.searchStore.sortOption;
    return url;
  },
}
module.exports = SearchUrlMixin;
