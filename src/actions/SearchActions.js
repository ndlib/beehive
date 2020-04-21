import AppDispatcher from '../dispatcher/AppDispatcher'
import SearchActionTypes from '../constants/SearchActionTypes'

class SearchActions {
  // Init
  loadSearchResults (collection, baseApiUrl, searchTerm, facetOption, sortOption, matchMode, field, start, view) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_LOAD_RESULTS,
      collection: collection,
      baseApiUrl: baseApiUrl,
      searchTerm: searchTerm,
      facetOption: facetOption,
      sortOption: sortOption,
      matchMode: matchMode,
      field: field,
      start: start,
      view: view,
    })
  }

  reloadSearchResults (data) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_RELOAD_RESULTS,
      data: data,
    })
  }

  setSearchTerm (term) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_TERM,
      term: term,
    })
  }

  setSelectedFacet (facet) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_SELECTED_FACET,
      facet: facet,
    })
  }

  setSort (sort) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_SORT,
      sort: sort,
    })
  }

  setView (view) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_VIEW,
      view: view,
    })
  }

  setField (field) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_FIELD,
      field: field,
    })
  }

  setMatchMode (mode) {
    AppDispatcher.dispatch({
      actionType: SearchActionTypes.SEARCH_SET_MODE,
      mode: mode,
    })
  }
}
export default new SearchActions()
