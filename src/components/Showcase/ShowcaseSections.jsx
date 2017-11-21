'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, { Paper } from 'material-ui'

var ShowcaseEndingCard = require('./ShowcaseEndingCard.jsx');
var SectionCard = require('../Section/SectionCard.jsx');

var ShowcaseSections = createReactClass({

  propTypes: {
    showcase: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
  },

  style: function() {
    return {
      height: this.props.height + "px",
      display: "inline-block",
      paddingRight: "175px",
      boxShadow: "none",
      //lineHeight: this.props.height + "px",
    }
  },

  sections: function() {
    var sections = this.props.showcase.sections;
    if(sections) {
      var sectionNodes = sections.map(function(section, index) {
        var nodes = [];

        nodes.push((
          <SectionCard section={section} height={this.props.height} />
        ));
        return nodes;
      }.bind(this));
      return sectionNodes;
    } else {
      return null;
    }
  },

  nextShowcase: function() {
    var nextShowcase;
    if(this.props.showcase.nextObject) {
      nextShowcase = (<ShowcaseEndingCard height={this.props.height} siteObject={this.props.showcase.nextObject} />);
    }
    return nextShowcase;
  },

  render: function() {
    return (
      <Paper id="sections-content-inner" className="sections-content-inner" style={this.style()}>
        {this.sections()}
        {this.nextShowcase()}
      </Paper>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseSections;
