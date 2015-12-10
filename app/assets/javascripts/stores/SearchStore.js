// This store retains data on search results retreived from the Honeycomb API.
// In addition, it also stores some user selections that don't affect the search
// results, such as the currently clicked item. This is purely so that multiple
// components can query the store to get this information instead of talking directly
// to each other. Any time a property changes that will trigger the search results to change,
// the store will emit a single SearchStoreChanged event, regardless of why it changed.
// If a property changes that does not change the results, it will emit an individual
// event specific to that change, such as SearchStoreSelectedItemChanged.
var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var SearchActionTypes = require("../constants/SearchActionTypes");

class SearchStore extends EventEmitter {
  constructor() {
    this.baseApiUrl = "";   // Bases url to use when connecting to the Honeycomb API
    this.collection = null; // Collection json
    this.searchTerm = "";   // The primary search term to use when querying the API
    this.items = [];    // Subset of items returned by the query after filtering on facet, row limit,
                        // and starting item.
    this.found = null;  // Total number of items that were found using the search term.
    this.start = null;  // Start item for the query
    this.facets = null; // List of facet options available for this collection
    this.sorts = null;  // List of sort options available for this collection
    this.count = 0;     // The count of items returned by the current query (<= found since items returned is a subset).
    this.rowLimit = 12; // The maximum number of items that a query will return.

    // User selections that affect the data
    this.facetOption = null;
    this.sortOption = null;

    // User selections that only affect the view (don't require a reload)
    this.selectedItem = null;
    this.view = null;

    AppDispatcher.register(this.receiveAction.bind(this));
  }

  // This ideally should only need to be called once as part of initialization. Subsequent
  // calls should change a property and call reload if that property requires reloading data
  // from the api
  loadSearchResults(params) {
    this.setQueryParams(params);
    this.executeQuery("load");
  }

  reloadSearchResults(params) {
    this.setQueryParams(params);
    this.executeQuery("reload");
  }

  setQueryParams(params) {
    this.collection = params.collection;
    this.baseApiUrl = params.baseApiUrl;
    this.searchTerm = params.searchTerm;
    this.facetOption = params.facetOption;
    this.sortOption = params.sortOption;
    this.start = params.start;
    this.view = params.view ? params.view : "grid";
  }

  getQueryParams() {
    return {
      collection: this.collection,
      baseApiUrl: this.baseApiUrl,
      searchTerm: this.searchTerm,
      facetOption: this.facetOption,
      sortOption: this.sortOption,
      start: this.start,
      view: this.view,
    };
  }

  executeQuery(reason) {
    reason = typeof reason != "undefined" ? reason : "load";

    var url = this.baseApiUrl + "?q=" + encodeURIComponent(this.searchTerm);
    if(this.facetOption && this.facetOption.name && this.facetOption.value) {
      url += "&facets[" + this.facetOption.name + "]=" + this.facetOption.value;
    }
    if(this.sortOption) {
      url += "&sort=" + this.sortOption;
    }
    url += "&start=" + this.start;
    url += "&rows=" + this.rowLimit;

    $.ajax({
      context: this,
      type: "GET",
      url: url,
      dataType: "json",
      success: function(result) {
        this.setItems(result.hits);
        this.sorts = result.sorts;
        this.facets = result.facets;
        this.emit("SearchStoreChanged", reason);
      },
      error: function(request, status, thrownError) {
        this.emit("SearchStoreQueryFailed", { request: request, status: status, error: thrownError });
      }
    });
  }

  setTerm(term) {
    this.searchTerm = term;
    this.executeQuery();
  }

  setSelectedFacet(facet) {
    this.facetOption = facet;
    this.executeQuery();
  }

  setSelectedSort(sort) {
    this.sortOption = sort;
    this.executeQuery();
  }

  mapHitToItem(hit) {
    var item = {};
    item["@id"] = hit["@id"];
    item.name = hit.name;
    item.description = hit.description;
    item.image = {
      "thumbnail/medium": {
        contentUrl: hit.thumbnailURL
      }
    };
    return item;
  }

  // Translates all hits to items. A hit json has a different structure from an item,
  // and most objects that interact with this store expect an item to look like an item json.
  setItems(hits) {
    this.items = [];
    this.found = hits.found;
    this.start = hits.start;
    for (var h in hits.hit) {
      if (hits.hit.hasOwnProperty(h)){
        var hit = hits.hit[h];
        var item = this.mapHitToItem(hit);
        this.items.push(item);
      }
    }
    this.count = this.items.length;
  }

  setView(view) {
    this.view = view;
    this.emit("SearchStoreViewChanged");
  }

  // Overrides can be provided to override the value in the store when creating the uri params.
  // This was primarily created to allow pagination to generate links using the same search, but
  // with other start values.
  searchUri(overrides) {
    var uri = "/" + this.collection.id +
      "/" + this.collection.slug +
      "/search?q=" + this.searchTerm;
    if(this.facetOption && this.facetOption.name && this.facetOption.value){
      uri += "&facet[" + this.facetOption.name + "]=" + this.facetOption.value;
    }
    if(this.sortOption) {
      uri += "&sort=" + this.sortOption;
    }
    if(overrides && overrides.start != "undefined") {
      uri += "&start=" + overrides.start;
    } else if(this.start) {
      uri += "&start=" + this.start;
    }
    uri += "&view=" + this.view;
    return uri;
  }

  // Receives actions sent by the AppDispatcher
  receiveAction(action) {
    switch(action.actionType) {
      case SearchActionTypes.SEARCH_LOAD_RESULTS:
        this.loadSearchResults(action);
        break;
      case SearchActionTypes.SEARCH_RELOAD_RESULTS:
        this.reloadSearchResults(action.data);
        break;
      case SearchActionTypes.SEARCH_SET_TERM:
        this.setTerm(action.term);
        break;
      case SearchActionTypes.SEARCH_SET_SELECTED_FACET:
        this.setSelectedFacet(action.facet);
        break;
      case SearchActionTypes.SEARCH_SET_SORT:
        this.setSelectedSort(action.sort);
        break;
      case SearchActionTypes.SEARCH_SET_VIEW:
        this.setView(action.view);
        break;
      default:
        break;
    }
  }

  getNextItem(item) {
    for(var i = 0; i < this.items.length; ++i) {
      if(this.items[i]["@id"] == item["@id"]) {
        var nextI = (i + 1);
        if(nextI > this.items.length - 1) {
          return null;
        } else {
          return this.items[nextI];
        }
      }
    }
    return null;
  }

  getPreviousItem(item) {
    for(var i = 0; i < this.items.length; ++i) {
      if(this.items[i]["@id"] == item["@id"]) {
        var prevI = i - 1;
        if(prevI < 0) {
          return null;
        } else {
          return this.items[prevI];
        }
      }
    }
    return null;
  }
}

var searchStore = new SearchStore();
module.exports = searchStore;
