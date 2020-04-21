const keyMirror = require('keymirror')

const SearchActionTypes = keyMirror({
  SEARCH_LOAD_RESULTS: null,
  SEARCH_RELOAD_RESULTS: null,
  SEARCH_SET_SORT: null,
  SEARCH_SET_SELECTED_FACET: null,
  SEARCH_SET_TERM: null,
  SEARCH_SET_VIEW: null,
  SEARCH_SET_FIELD: null,
  SEARCH_SET_MODE: null,
})

export default SearchActionTypes
