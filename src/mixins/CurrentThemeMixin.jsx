"use strict"
var React = require('react');
var mui = require("material-ui");

var CurrentThemeMixin = {
  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getCurrentTheme() {
    return this.context.muiTheme;
  },

  getCurrentPallette() {
    return this.getCurrentTheme().rawTheme.palette;
  },

  // Reusable styles
  lightIconStyle() {
    return {
      color: 'white',
      fontSize: '18px',
      verticalAlign: 'text-bottom',
      minWidth: '26px',
    };
  },

  darkIconStyle() {
    return {
      fontSize: '18px',
      verticalAlign: 'text-bottom',
      minWidth: '26px',
    };
  },

  cardHeadersCommon() {
    return {
      fontFamily: 'GPCMed',
    };
  },

  pageWidth() {
    return {
      //maxWidth: '960px',
      margin: '0 8%',
    };
  },

};
module.exports = CurrentThemeMixin;
