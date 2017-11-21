"use strict"
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
var mui = require("material-ui");

const getCurrentPallette = (muiTheme) => {
  return muiTheme.rawTheme.palette;
}

// Reusable styles
const lightIconStyle = () => {
  return {
    color: 'white',
    fontSize: '18px',
    verticalAlign: 'text-bottom',
    minWidth: '26px',
  };
}

const darkIconStyle = () => {
  return {
    fontSize: '18px',
    verticalAlign: 'text-bottom',
    minWidth: '26px',
  };
}

const cardHeadersCommon = () => {
  return {
    fontFamily: 'GPCMed',
  };
}

const pageWidth = () => {
  return {
    //maxWidth: '960px',
    margin: '0 8%',
  };
}

module.exports = {
  getCurrentPallette,
  lightIconStyle,
  darkIconStyle,
  cardHeadersCommon,
  pageWidth,
};
