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
      muiTheme: ThemeManager.getMuiTheme(BeehiveTheme),
    };
  },

  // Reusable themes
  primaryIconTheme: function() {
    return {

    };
  },

  secondaryIconTheme: function() {
    return {

    };
  },

};
module.exports = MuiThemeMixin;
