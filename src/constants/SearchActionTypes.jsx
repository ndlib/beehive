var keyMirror = require('keymirror');

var SearchActionTypes = keyMirror({
  SEARCH_LOAD_RESULTS: null,
  SEARCH_RELOAD_RESULTS: null,
  SEARCH_SET_SORT: null,
  SEARCH_SET_SELECTED_FACET: null,
  SEARCH_SET_TERM: null,
  SEARCH_SET_VIEW: null,
});

module.exports = SearchActionTypes;
