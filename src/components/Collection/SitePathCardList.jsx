
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, {GridList} from 'material-ui'
var theme = require('../../themes/beehive.jsx');
var MediaQuery = require('react-responsive');

var SitePathCard = require('./SitePathCard.jsx');

var SitePathCardList = createReactClass({
  propTypes: {
    sitePath: PropTypes.array.isRequired,
    intro: PropTypes.element,
  },

  pathNodes: function() {
    return this.props.sitePath.map(function(siteObject, index) {
      return (<SitePathCard siteObject={siteObject} key={index} />);
    });
  },

  allNodes: function() {
    var nodes = [];
    if (this.props.intro) {
      nodes.push(
        <div key="intro">{this.props.intro}</div>
      );
    }
    return nodes.concat(this.pathNodes());
  },

  gridList: function(cols) {
    return (
      <GridList cols={cols} padding={24} cellHeight="auto">
        {this.allNodes()}
      </GridList>
    );
  },

  render: function() {
    if (this.props.sitePath.length > 0 || this.props.intro) {
      return (
        <div>
          <MediaQuery maxWidth={650}>
            {this.gridList(1)}
          </MediaQuery>
          <MediaQuery minWidth={650} maxWidth={1224}>
            {this.gridList(2)}
          </MediaQuery>
          <MediaQuery minWidth={1224} maxWidth={1724}>
            {this.gridList(3)}
          </MediaQuery>
          <MediaQuery minWidth={1724}>
            {this.gridList(4)}
          </MediaQuery>
        </div>
      );
    }
    else {
      return (<span/>);
    }
  }
});

module.exports = SitePathCardList;
