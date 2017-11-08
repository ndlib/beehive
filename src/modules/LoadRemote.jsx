"use strict"
var React = require("react");
var ItemActions = require('../actions/ItemActions.jsx');
var SectionActions = require('../actions/SectionActions.jsx');
var OpenItemDisplay = require('../modules/OpenItemDisplay.js');

const loadRemoteCollection = (url, callback) => {
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function(result) {
      callback(result)
    },
    error: function(request, status, thrownError) {
      window.location = window.location.origin + '/404';
    }
  });
}

const loadRemoteItem = (url) => {
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function(result) {
      ItemActions.setCurrentItem(result.items);
      ItemActions.showItemDialogWindow(result.items);
    },
    error: function(request, status, thrownError) {}
  });
}

const loadRemoteSection = (url) => {
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function(result) {
      SectionActions.setCurrentSection(result.showcases.sections);
      SectionActions.showSectionDialogWindow(result.showcases.sections)
    },
    error: function(request, status, thrownError) {}
  });
}

const itemOnClick = (item) => {
  return () => {
    loadRemoteItem(item['@id']);
    OpenItemDisplay(item['@id'].split("/").pop(), 'item');
  }
}

const sectionOnClick = (section) => {
  return () => {
    loadRemoteSection(section['@id']);
    OpenItemDisplay(section['@id'].split("/").pop(), 'section');
  }
}

module.exports = {
  loadRemoteCollection,
  loadRemoteItem,
  loadRemoteSection,
  itemOnClick,
  sectionOnClick,
};
