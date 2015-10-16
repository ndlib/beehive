"use strict"
var mui = require("material-ui");
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var BeehiveTheme = require('../themes/beehive');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var MuiThemeMixin = {
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(BeehiveTheme),
    };
  },

  // Reusable styles
  lightIconStyle: function() {
    return {
      color: 'white',
      fontSize: '18px',
      verticalAlign: 'text-bottom',
      minWidth: '26px',
    };
  },

  darkIconStyle: function() {
    return {
      fontSize: '18px',
      verticalAlign: 'text-bottom',
      minWidth: '26px',
    };
  },

  cardHeadersCommon: function() {
    return {
      fontFamily: 'GPCMed',
    };
  },

  pageWidth: function() {
    return {
      maxWidth: '960px',
      margin: '0 auto',
    };
  },

};
module.exports = MuiThemeMixin;
