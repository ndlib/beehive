var AppDispatcher = require("../dispatcher/AppDispatcher");
var SearchActionTypes = require("../constants/SearchActionTypes");
var EventEmitter = require("../EventEmitter");

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
    })
  }

  reloadSearchResults(data) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_RELOAD_RESULTS,
      data: data
    })
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

  // Shows the item in a zoomed in window
  showItem(item) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SHOW_ITEM,
      item: item
    });
  }

  // Shows the next item in the search results, relative to the given item
  showNextItem(item) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SHOW_NEXT_ITEM,
      item: item
    });
  }

  // Shows the previous item in the search results, relative to the given item
  showPreviousItem(item) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SHOW_PREVIOUS_ITEM,
      item: item
    });
  }

  setView(view) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_VIEW,
      view: view
    });
  }
  /*
  showItemDialogWindow(item) {
    EventEmitter.emit("ItemDialogWindow", item);
  }

  hideItemDialogWindow() {
    EventEmitter.emit("HideItemDialogWindow", 'hide');
  }
  */
}
var SearchActions = new SearchActions();
module.exports = SearchActions;
