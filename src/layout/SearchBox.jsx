'use strict'
var React = require('react');
var mui = require('material-ui');
var ColorManipulator = require('material-ui/lib/utils/color-manipulator');
var SearchStore = require('../store/SearchStore.js');
var SearchActions = require('../actions/SearchActions.js');

var SearchBox = React.createClass({
  mixins: [
    require('../mixins/CurrentThemeMixin.jsx')
  ],
  propTypes: {
    collection: React.PropTypes.object,
    primary: React.PropTypes.bool,
    useStore: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      primary: true,
      active: false,
      useStore: true,
    };
  },

  getInitialState: function() {
    var state = {
      active: this.props.active,
    };
    return state;
  },

  onChange: function(e) {
    this.setTerm(e.target.value);
  },

  onClick: function(e) {
    if (this.state.active && this.state.searchTerm) {
      if(this.props.useStore) {
        SearchActions.setSearchTerm(this.state.searchTerm);
      } else {
        var url = window.location.origin
          + "/" + this.props.collection.id
          + "/" + this.props.collection.slug
          + "/search?q=" + this.state.searchTerm;
        window.location = url;
      }
    } else if (this.state.active) {
      this.setState({active: false});
    } else {
      this.setState({active: true});
    }
  },

  componentDidMount: function() {
    this.setTerm(SearchStore.searchTerm);
  },

  setTerm: function(term) {
    var cleanTerm = encodeURIComponent(term);
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
        //defaultValue={SearchStore.searchTerm}
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
          style={{zIndex: '0', minWidth: 'auto', boxShadow: 'none',  lineHeight: '36px'}}
          primary={false}
          secondary={true}
          disableTouchRipple={true}
        >
          <mui.FontIcon className="material-icons" style={this.lightIconStyle()}>search</mui.FontIcon>
        </mui.RaisedButton>
      </div>
    );
  }
});
module.exports = SearchBox
