"use strict"
var AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
var SearchActionTypes = require("../constants/SearchActionTypes.jsx");

class SearchActions {
  // Init
  loadSearchResults(collection, baseApiUrl, searchTerm, facetOption, sortOption, start, view) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_LOAD_RESULTS,
      collection: collection,
      baseApiUrl: baseApiUrl,
      searchTerm: searchTerm,
      facetOption: facetOption,
      sortOption: sortOption,
      start: start,
      view: view
    });
  }

  reloadSearchResults(data) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_RELOAD_RESULTS,
      data: data
    });
  }

  setSearchTerm(term) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_TERM,
      term: term
    });
  }

  setSelectedFacet(facet) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_SELECTED_FACET,
      facet: facet
    });
  }

  setSort(sort) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_SORT,
      sort: sort
    });
  }

  setView(view) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_VIEW,
      view: view
    });
  }
}
module.exports = new SearchActions();
//export default SearchActions;
