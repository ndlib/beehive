var keyMirror = require('keymirror');

var SearchActionTypes = keyMirror({
  SEARCH_LOAD_RESULTS: null,
  SEARCH_SET_SORT: null,
  SEARCH_SET_SELECTED_FACET: null,
  SEARCH_SET_TERM: null,
  SEARCH_SET_VIEW: null,
  SEARCH_SHOW_ITEM: null,
  SEARCH_SHOW_NEXT_ITEM: null,
  SEARCH_SHOW_PREVIOUS_ITEM: null
});

module.exports = SearchActionTypes;
