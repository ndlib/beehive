import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var mui = require("material-ui");
// var ThemeManager = require('material-ui/lib/styles/theme-manager');
// var BeehiveTheme = require('../../themes/beehive.jsx');

var CollectionIntro = createReactClass({
  propTypes: {
    collection: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      //muiTheme: ThemeManager.getMuiTheme(BeehiveTheme),
    };
  },

  style: function () {
    return ({
      margin:'60px 0',
    });
  },

  render: function() {
    if(this.props.collection) {
      return (
        <div className="essay-content" style={this.style()} dangerouslySetInnerHTML={{__html:this.props.collection.short_description}} />
      );
    }
  }
});

module.exports = CollectionIntro;
