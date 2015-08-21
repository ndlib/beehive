'use strict'
var searchMixin = {
  loadSearchResults: function(url) {
    var url = url;
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      dataType: "json",
      success: function(result) {
        this.setItems(result.hits);
        this.setFacets(result.facets);
        this.setSorts(result.sorts)
      },
      error: function(request, status, thrownError) {
          window.location = window.location.origin + '/404';
      }
    });
  },

  setFacets: function(facets) {
    this.setState({facets: facets});
  },

  setItems: function(hits) {
    var items = [];
    for (var h in hits.hit) {
      var hit = hits.hit[h];
      var item = this.mapHitToItem(hit);
      items.push(item);
    }
    this.setState({
      items: items,
    });
  },

  setSorts: function(sorts) {
    var regex = /\S+&sort=/;
    var sortOption = '';
    if(window.location.search.match(regex)) {
      sortOption = window.location.search.replace(regex, '');
    };

    this.setState({
      sortOptions: sorts,
      selectedIndex: sorts.map(function(s) {return s.value; }).indexOf(sortOption),
    });
  },

  mapHitToItem: function(hit) {
    var item = {};
    item['@id'] = hit['@id'];
    item.name = hit.name;
    item.description = hit.description;
    item.image = {
      "thumbnail/small": {
        contentUrl: hit.thumbnailURL
      }
    };
    return item;
  },

}

module.exports = searchMixin;
