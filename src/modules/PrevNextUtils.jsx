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

  clickAction: function(url) {
    return (event) => {
      event.preventDefault();
      var id = url.split("/").pop();
      if(url.indexOf('item') > -1) {
        LoadRemote.loadRemoteItem(url);
        OpenItemDisplay(id, 'item');
      }
      else if(url.indexOf('section') > -1) {
        LoadRemote.loadRemoteSection(url);
        OpenItemDisplay(id, 'section');
      }
      else {
        console.log('an invalid url was provided', url);
      }
    }
  },
}

module.exports = PrevNext;
