"use strict"
var React = require('react');
const OpenItemDisplay = require('./OpenItemDisplay.js')
const LoadRemote = require('./LoadRemote.jsx')

var PrevNext = {
  buttonStyles: function(offsetTop, bgColor) {
    if (offsetTop) {
      return {
        top: offsetTop + 'px',
        zIndex: 100,
        backgroundColor: bgColor,
        color: '#fff',
      };
    } else {
      return {
        backgroundColor: bgColor,
        color: '#fff',
      };
    }
  },
}

module.exports = PrevNext;
