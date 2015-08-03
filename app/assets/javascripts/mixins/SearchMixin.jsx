'use strict'
var searchMixin = {
  loadSearchResults: function(url) {
    console.log(url);
    var url = url;
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      dataType: "json",
      success: function(result) {
        this.setItems(result.hits);
      },
      error: function(request, status, thrownError) {
          window.location = window.location.origin + '/404';
      }
    });
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

  mapHitToItem: function(hit) {
    var item = {};
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
