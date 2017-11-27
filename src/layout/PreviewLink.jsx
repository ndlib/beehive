'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, { Card, CardMedia, CardTitle, FloatingActionButton, FontIcon} from 'material-ui'
import {Link} from 'react-router-dom'
var HoneycombImage = require("../other/HoneycombImage.jsx");
var MediaQuery = require('react-responsive');
const CollectionUrl = require('../modules/CollectionUrl.jsx')

var PreviewLink = createReactClass({
  propTypes: {
    siteObject: PropTypes.object,
  },

  getInitialState: function () {
    return {
      hover: false,
    };
  },

  mouseOver: function () {
    this.setState({hover: true});
  },

  mouseOut: function () {
    this.setState({hover: false});
  },

  style: function(media) {
    return {
      position: "fixed",
      bottom: "60px",
      right: "40px",
      cursor: "pointer",
      color: "#fff",
      opacity: this.state.hover ? "1.0" : "0.3",
      maxWidth: "200px",
    };
  },

  buttonStyle: function() {
    return {
      position: "fixed",
      bottom: "107px",
      right: "40px",
      cursor: "pointer",
    }
  },

  getCard: function(media) {

    return (
        <Card style={this.style(media)} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} >
          <CardMedia overlay={<CardTitle title="Continue" />}>
            <HoneycombImage image={this.props.siteObject.image} size="small" />
          </CardMedia>
          <FloatingActionButton
            backgroundColor="#2c5882"
            style={this.buttonStyle()}
          >
            <FontIcon className="material-icons">arrow_forward</FontIcon>
          </FloatingActionButton>
        </Card>

    );
  },

  render: function() {
    var url = CollectionUrl.collectionObjectUrl(this.props.siteObject);
    return (
      <Link to={url}>
      <MediaQuery minWidth={850}>
        <MediaQuery minWidth={1500}>
          { this.getCard("wide") }
        </MediaQuery>
        <MediaQuery maxWidth={1500}>
          { this.getCard("narrow") }
        </MediaQuery>
      </MediaQuery>
      </Link>
    );
  }
});

module.exports = PreviewLink;
