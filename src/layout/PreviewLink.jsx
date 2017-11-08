'use strict'
var React = require("react");
var mui = require('material-ui');

var HoneycombImage = require("../other/HoneycombImage.jsx");
var MediaQuery = require('react-responsive');
import { Link } from 'react-router';
const CollectionUrl = require('../modules/CollectionUrl.jsx')

var PreviewLink = React.createClass({
  mixins: [
    require("../mixins/MuiThemeMixin.jsx")
  ],
  propTypes: {
    siteObject: React.PropTypes.object,
  },

  getInitialState: function () {
    return {
      hover: false
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
      color: "#f5f5f5",
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
      backgroundColor: "#2c5882",
    }
  },

  getCard: function(media) {

    return (
        <mui.Card style={this.style(media)} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} >
          <mui.CardMedia overlay={<mui.CardTitle title="Continue" />}>
            <HoneycombImage image={this.props.siteObject.image} size="small" />
          </mui.CardMedia>
          <mui.FloatingActionButton
            linkButton={false}
            style={this.buttonStyle()}
            zDepth={2}
          >
            <mui.FontIcon style={{ mixBlendMode: "soft-light" }} className="material-icons">arrow_forward</mui.FontIcon>
          </mui.FloatingActionButton>
        </mui.Card>

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
