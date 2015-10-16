'use strict'
var React = require('react');
var mui = require('material-ui');

var SearchBox = React.createClass({
  mixins: [SearchUrlMixin, CurrentThemeMixin],
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
        <mui.TextField
          hintText="search"
          ref='searchBox'
          onChange={this.onChange}
          defaultValue={this.props.searchTerm}
          onEnterKeyDown={this.onClick}
        />
        <mui.RaisedButton
          onClick={this.onClick}
          style={{zIndex: '0'}}
          primary={true}
        >
          <mui.FontIcon className="material-icons" style={this.lightIconStyle()}>search</mui.FontIcon>
        </mui.RaisedButton>
      </div>
    );
  }
});
module.exports = SearchBox
