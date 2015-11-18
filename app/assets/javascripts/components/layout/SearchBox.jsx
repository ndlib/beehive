'use strict'
var React = require('react');
var mui = require('material-ui');
var ColorManipulator = require('material-ui/lib/utils/color-manipulator');

var SearchBox = React.createClass({
  mixins: [SearchUrlMixin, CurrentThemeMixin],
  propTypes: {
    collection: React.PropTypes.object.isRequired,
    searchTerm: React.PropTypes.string,
    primary: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      searchTerm: "",
      primary: true,
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

  hintStyle: function() {
    return {
      color: ColorManipulator.lighten(this.props.primary ? this.getCurrentPallette().alternateTextColor : this.getCurrentPallette().textColor, 0.5),
    };
  },

  inputStyle: function() {
    return {
      color: (this.props.primary ? this.getCurrentPallette().alternateTextColor : this.getCurrentPallette().textColor),
    };
  },

  render: function() {
    return(
      <div style={{display:'inline-block'}}>
        <mui.TextField
          hintText='search'
          ref='searchBox'
          onChange={this.onChange}
          defaultValue={this.props.searchTerm}
          onEnterKeyDown={this.onClick}
          hintStyle={this.hintStyle()}
          inputStyle={this.inputStyle()}
        />
        <mui.RaisedButton
          onClick={this.onClick}
          style={{zIndex: '0', minWidth: 'auto', boxShadow: 'none',  }}
          primary={false}
          secondary={true}
        >
          <mui.FontIcon className="material-icons" style={this.lightIconStyle()}>search</mui.FontIcon>
        </mui.RaisedButton>
      </div>
    );
  }
});
module.exports = SearchBox
