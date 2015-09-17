'use strict'
var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;

var SearchBox = React.createClass({
  mixins: [SearchUrlMixin, MuiThemeMixin],
  propTypes: {
    collection: React.PropTypes.object.isRequired,
    searchTerm: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      searchTerm: "",
    };
  },

  getInitialState: function() {
    var state = {
      searchTerm: this.props.searchTerm,
    };
    return state;
  },

  onChange: function(e) {
    this.setTerm(this.refs.searchBox.getValue());
  },

  onClick: function(e) {
    window.location.assign(this.searchUrl(this.props.collection));
  },

  componentDidMount: function() {
    this.initSearchStore();
    this.setTerm(this.refs.searchBox.getValue());
  },

  setTerm: function(term) {
    var cleanTerm = encodeURIComponent(term);
    window.searchStore.searchTerm = cleanTerm;
    this.setState({searchTerm: cleanTerm});
  },

  render: function() {
    return(
      <div style={{display:'inline-block'}}>
        <TextField
          hintText="search"
          ref='searchBox'
          onChange={this.onChange}
          defaultValue={this.props.searchTerm}
          onEnterKeyDown={this.onClick}
        />
        <button
          onClick={this.onClick}
          className={'btn btn-primary btn-view'}
          style={{zIndex: '0'}}
        >
          <i className= "mdi-action-search"></i>
          Search
        </button>
      </div>
    );
  }
});
module.exports = SearchBox
