var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var SearchActionTypes = require("../constants/SearchActionTypes");

class SearchStore extends EventEmitter {
  constructor() {
    this.baseApiUrl = "";
    this.collection = null;
    this.searchTerm = "";
    this.items = [];
    this.found = null
    this.start = null;
    this.facets = null;

    this.facetOption = { name: null, value: null };
    this.sortOption = null;
    this.selectedPageIndex = null;
    this.selectedItem = null;


    AppDispatcher.register(this.receiveAction.bind(this));
  }

  // This ideally should only need to be called once as part of initialization. Subsequent
  // calls should change a property and call reload.
  loadSearchResults(params) {
    this.collection = params.collection;
    this.baseApiUrl = params.baseApiUrl;
    this.searchTerm = params.searchTerm;
    this.facetOption = params.facetOption;
    this.sortOption = params.sortOption;
    this.start = params.start;
    this.reload();
  }

  reload() {
    var url = this.baseApiUrl + "?q=" + encodeURIComponent(this.searchTerm);
    if(this.facetOption) {
      url += "&facets[" + this.facetOption.name + "]=" + this.facetOption.value;
    }
    if(this.sortTerm) {
      url += "&sort=" + this.sortTerm;
    }
    url += "&start=" + this.start;

    $.ajax({
      context: this,
      type: "GET",
      url: url,
      dataType: "json",
      success: function(result) {
        this.setItems(result.hits);
        this.setSorts(result.sorts);
        this.setFacets(result.facets);
        this.emit("SearchStoreChanged");
      },
      error: function(request, status, thrownError) {
        this.emit("SearchStoreLoadFailed");
        //window.location = window.location.origin + '/404';
      }
    });
  }

  setTerm(term) {
    this.searchTerm = term;
    this.reload();
  }

  setSelectedFacet(facet) {
    this.facetOption = facet;
    this.reload();
  }

  setSelectedSort(sort) {
    this.sortOption = sort;
    this.reload();
  }

  setFacets(facets) {
    this.facets = facets;
  }

  setItems(hits) {
    this.items = [];
    this.found = hits.found;
    this.start = hits.start;
    for (var h in hits.hit) {
      var hit = hits.hit[h];
      var item = this.mapHitToItem(hit);
      this.items.push(item);
    }
  }

  setSorts(sorts) {
    var regex = /\S+&sort=/;
    var sortOption = '';
    if(window.location.search.match(regex)) {
      sortOption = window.location.search.replace(regex, '');
    };
    this.sortOptions = sorts;
    this.selectedPageIndex = sorts.map(function(s) {return s.value; }).indexOf(this.sortOption);
  }

  mapHitToItem(hit) {
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
  }

  searchUri() {
    var uri = "/" + this.collection.id
      + "/" + this.collection.slug
      + "/search?q=" + this.searchTerm;
    if(this.facetOption){
      if(this.facetOption.name) {
        uri += "&facet[" + this.facetOption.name + "]=" + this.facetOption.value;
      }
    }
    if(this.sortOption) {
      uri += "&sort=" + this.sortOption;
    }
    return uri;
  }

  // Receives actions sent by the AppDispatcher
  receiveAction(action) {
    switch(action.actionType) {
      case SearchActionTypes.SEARCH_LOAD_RESULTS:
        this.loadSearchResults(action);
        break;
      case SearchActionTypes.SEARCH_SET_TERM:
        this.setTerm(action.term);
        break;
      case SearchActionTypes.SEARCH_SET_SELECTED_FACET:
        this.setSelectedFacet(action.facet);
        break;
      case SearchActionTypes.SEARCH_SHOW_ITEM:
        this.selectedItem = action.item;
        this.emit("SearchStoreSelectedItemChanged");
        break;
      case SearchActionTypes.SEARCH_SHOW_NEXT_ITEM:
        this.setProps(action.item);
        this.emit("SearchStoreSelectedItemChanged");
        break;
      case SearchActionTypes.SEARCH_SHOW_PREVIOUS_ITEM:
        this.setProps(action.item);
        this.emit("SearchStoreSelectedItemChanged");
        break;
      default:
        break;
    }
  }

  addChangeListener(changeEvent, callback) {
    this.on(changeEvent, callback);
  }

  removeChangeListener(changeEvent, callback) {
    this.removeListener(changeEvent, callback);
  }
}

var searchStore = new SearchStore();
module.exports = searchStore;
