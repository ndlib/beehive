'use strict'
var Colors = require('material-ui/lib/styles/colors');
var ColorManipulator = require('material-ui/lib/utils/color-manipulator');
var Spacing = require('material-ui/lib/styles/spacing');

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: 'rgba(0, 0, 0, 0.641176)',
    primary2Color: 'rgba(0, 0, 0, 0.541176)',
    primary3Color: Colors.lightBlack,
    accent1Color: '#2c5882',
    accent2Color: '#3b6893',
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
  },
};
