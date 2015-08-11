'use strict'
var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;

var SearchBox = React.createClass({
  propTypes: {
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
    console.log('click: ', this.state.searchTerm);
  },

  render: function() {
    return(
      <div className='pull-left'>
        <TextField
          hintText="search"
          ref='searchBox'
          onChange={this.onChange}
          defaultValue={this.props.searchTerm}
        />
        <button
          onClick={this.onClick}
          className={'btn btn-primary btn-view'}
        >
          <i className= "mdi-action-search"></i>
          Search
        </button>
      </div>
    );
  }
});
module.exports = SearchBox
