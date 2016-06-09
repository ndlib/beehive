// This store retains data on search results retreived from the Honeycomb API.
// In addition, it also stores some user selections that don't affect the search
// results, such as the currently clicked item. This is purely so that multiple
// components can query the store to get this information instead of talking directly
// to each other. Any time a property changes that will trigger the search results to change,
// the store will emit a single SearchStoreChanged event, regardless of why it changed.
// If a property changes that does not change the results, it will emit an individual
// event specific to that change, such as SearchStoreSelectedItemChanged.
var AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
var EventEmitter = require("events").EventEmitter;
var SearchActionTypes = require("../constants/SearchActionTypes.jsx");

class SearchStore extends EventEmitter {
  constructor() {
    super();
    this._baseApiUrl = "";   // Bases url to use when connecting to the Honeycomb API
    this._collection = null; // Collection json
    this._searchTerm = "";   // The primary search term to use when querying the API
    this._items = [];    // Subset of items returned by the query after filtering on facet, row limit,
                         // and starting item.
    this._found = null;  // Total number of items that were found using the search term.
    this._start = null;  // Start item for the query
    this._facets = null; // List of facet options available for this collection
    this._sorts = null;  // List of sort options available for this collection
    this._count = 0;     // The count of items returned by the current query (<= found since items returned is a subset).
    this._rowLimit = 12; // The maximum number of items that a query will return.

    // User selections that affect the data
    this._facetOption = null;
    this._sortOption = null;

    // User selections that only affect the view (don't require a reload)
    this._selectedItem = null;
    this._view = null;

    Object.defineProperty(this, "baseApiUrl", { get: function() { return this._baseApiUrl; } });
    Object.defineProperty(this, "collection", { get: function() { return this._collection; } });
    Object.defineProperty(this, "searchTerm", { get: function() { return this._searchTerm; } });
    Object.defineProperty(this, "items", { get: function() { return this._items; } });
    Object.defineProperty(this, "found", { get: function() { return this._found; } });
    Object.defineProperty(this, "start", { get: function() { return this._start; } });
    Object.defineProperty(this, "facets", { get: function() { return this._facets; } });
    Object.defineProperty(this, "sorts", { get: function() { return this._sorts; } });
    Object.defineProperty(this, "count", { get: function() { return this._count; } });
    Object.defineProperty(this, "rowLimit", { get: function() { return this._rowLimit; } });
    Object.defineProperty(this, "facetOption", { get: function() { return this._facetOption; } });
    Object.defineProperty(this, "sortOption", { get: function() { return this._sortOption; } });
    Object.defineProperty(this, "selectedItem", { get: function() { return this._selectedItem; } });
    Object.defineProperty(this, "view", { get: function() { return this._view; } });

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
    this._collection = params.collection;
    this._baseApiUrl = params.baseApiUrl;
    this._searchTerm = params.searchTerm;
    this._facetOption = params.facetOption;
    this._sortOption = params.sortOption;
    this._start = params.start;
    this._view = params.view ? params.view : "grid";
  }

  getQueryParams() {
    return {
      collection: this._collection,
      baseApiUrl: this._baseApiUrl,
      searchTerm: this._searchTerm,
      facetOption: this._facetOption,
      sortOption: this._sortOption,
      start: this._start,
      view: this._view,
    };
  }

  executeQuery(reason) {
    reason = typeof reason != "undefined" ? reason : "load";

    var url = this._baseApiUrl + "?q=" + this._searchTerm;
    if(this._facetOption !== undefined && this._facetOption !== null){
      for(var i = 0; i < this._facetOption.length; i++) {
        if(this._facetOption[i].name && this._facetOption[i].value) {
          url += "&facets["
            + this._facetOption[i].name
            + "]="
            + this._facetOption[i].value;
        }
      }

    }
    if(this._sortOption) {
      url += "&sort=" + this._sortOption;
    }
    url += "&start=" + this._start;
    url += "&rows=" + this._rowLimit;

    $.ajax({
      context: this,
      type: "GET",
      url: url,
      dataType: "json",
      success: function(result) {
        this.setItems(result.hits);
        this._sorts = result.sorts;
        this._facets = result.facets;
        this.emit("SearchStoreChanged", reason);
      },
      error: function(request, status, thrownError) {
        this.emit("SearchStoreQueryFailed", { request: request, status: status, error: thrownError });
      }
    });
  }

  setTerm(term) {
    // Reset starting item since the query has changed
    this._start = null;
    this._searchTerm = term;
    this.executeQuery();
  }

  setSelectedFacet(facet) {
    if(!this._facetOption){
      this._facetOption = [];
    }
    // should we add the facet, start by assuming yes we should
    var addFacet = true;
    // look for a facet wit the same name
    // if it is found, delete it
    // if it has the same name and same value, we don't want to add it so
    // set addFacet to false
    for (var i = 0; i < this._facetOption.length; i++) {
      if(this._facetOption[i].name == facet.name){
        if(this._facetOption[i].value == facet.value) {
          addFacet = false;
        }
        this._facetOption.splice(i, 1);
      }
    }
    if(addFacet){
      this._facetOption.push(facet);
    }
    // Reset starting item since the query has changed
    this._start = null;
    this.executeQuery();
  }

  setSelectedSort(sort) {
    this._sortOption = sort;
    // Reset starting item since the query has changed
    this._start = null;
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
    this._items = [];
    this._found = hits.found;
    this._start = hits.start;
    for (var h in hits.hit) {
      if (hits.hit.hasOwnProperty(h)){
        var hit = hits.hit[h];
        var item = this.mapHitToItem(hit);
        this._items.push(item);
      }
    }
    this._count = this._items.length;
  }

  setView(view) {
    this._view = view;
    this.emit("SearchStoreViewChanged");
  }

  // Overrides can be provided to override the value in the store when creating the uri params.
  // This was primarily created to allow pagination to generate links using the same search, but
  // with other start values.
  searchUri(overrides) {
    var uri = "/" + this._collection.id +
      "/" + this._collection.slug +
      "/search?q=" + this._searchTerm;
    if(this._facetOption && this._facetOption.length > 0) {
      for (var i = 0; i < this._facetOption.length; i++) {
        if(this._facetOption[i].name && this._facetOption[i].value) {
          uri += "&facet["
            + this._facetOption[i].name
            + "]="
            + this._facetOption[i].value;
        }
      }
    }
    if(this._sortOption) {
      uri += "&sort=" + this._sortOption;
    }
    if(overrides && overrides.start != "undefined") {
      uri += "&start=" + overrides.start;
    } else if(this._start) {
      uri += "&start=" + this._start;
    }
    uri += "&view=" + this._view;
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
    for(var i = 0; i < this._items.length; ++i) {
      if(this._items[i]["@id"] == item["@id"]) {
        var nextI = (i + 1);
        if(nextI > this._items.length - 1) {
          return null;
        } else {
          return this._items[nextI];
        }
      }
    }
    return null;
  }

  getPreviousItem(item) {
    for(var i = 0; i < this._items.length; ++i) {
      if(this._items[i]["@id"] == item["@id"]) {
        var prevI = i - 1;
        if(prevI < 0) {
          return null;
        } else {
          return this._items[prevI];
        }
      }
    }
    return null;
  }
}

module.exports = new SearchStore();
