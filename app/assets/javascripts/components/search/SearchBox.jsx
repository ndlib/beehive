'use strict'
var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;

var SearchBox = React.createClass({
  mixins: [MuiThemeMixin],
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
    this.setState({searchTerm: this.refs.searchBox.getValue()});
  },

  onClick: function(e) {
    window.location.assign(this.searchUrl());
  },

  searchUrl: function() {
    var url = window.location.origin + "/" +this.props.collection.id + "/" + this.props.collection.slug + "/search?q=" + this.state.searchTerm
    return url;
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