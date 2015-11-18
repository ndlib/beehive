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
      active: false,
    };
  },

  getInitialState: function() {
    var state = {
      searchTerm: this.props.searchTerm,
      active: this.props.active,
    };
    return state;
  },

  onChange: function(e) {
    console.log(e);
    this.setTerm(e.target.value);
  },

  onClick: function(e) {
    if (this.state.active) {
      window.location.assign(this.searchUrl(this.props.collection));
    } else {
      this.setState({active: true});
    }
  },

  componentDidMount: function() {
    this.initSearchStore();
    this.setTerm(this.props.searchTerm);
  },

  setTerm: function(term) {
    var cleanTerm = encodeURIComponent(term);
    window.searchStore.searchTerm = cleanTerm;
    this.setState({searchTerm: cleanTerm});
  },

  inputStyle: function() {
    return ({
      color: (this.props.primary ? this.getCurrentPallette().alternateTextColor : this.getCurrentPallette().textColor),
      height: '36px',
    });
  },

  handleKeyDown: function(e) {
    var ENTER = 13;
    if( e.keyCode == ENTER ) {
        this.onClick(e);
    }
  },

  input: function() {
    if (this.state.active) {
      return (<input
        placeholder='search'
        ref='searchBox'
        onChange={this.onChange}
        defaultValue={this.props.searchTerm}
        onKeyDown={this.handleKeyDown}
        inputStyle={this.inputStyle()}
        style={{height:'36px', verticalAlign:'top'}}
      />);
    } else {
      return (<div />);
    }
  },

  render: function() {
    return(
      <div style={{display:'inline-block', margin:'14px 0'}}>
        {this.input()}
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
