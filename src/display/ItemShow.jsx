'use strict'
var React = require("react");
var mui = require('material-ui');
var MediaQuery = require("react-responsive");
var Details = require('../display/Details.jsx');
var OpenseadragonViewer = require('../display/OpenseadragonViewer.jsx');

var ItemShow = React.createClass({
  displayName: "Item Show",

  propTypes: {
    item: React.PropTypes.object,
    additionalDetails: React.PropTypes.string,
    height: React.PropTypes.number,
  },

  outerStyles: function() {
    if (this.props.height) {
      return {
        height: this.props.height,
        position: "relative",
      }
    } else {
      return {}
    }
  },

  zoomStyles: function() {
    if (this.props.height) {
      return {
        height: this.props.height,
        position: "absolute",
        top: 0,
        width: "100%",
      }
    } else {
      return {}
    }
  },

  render: function() {
    var prevLink, nextLink, offsetTop;
    if (this.props.height) {
      offsetTop = this.props.height / 2;
    }
    if (this.props.item) {
      return (
        <div style={this.outerStyles()}>
          <MediaQuery minWidth={650}>
            <Details item={this.props.item} additionalDetails={this.props.additionalDetails} showDetails={true} />
          </MediaQuery>

          <div className="item-detail-zoom" style={this.zoomStyles()}>
            <MediaQuery minWidth={650}>
              <OpenseadragonViewer
                image={this.props.item.image}
                containerID={this.props.item.id}
                height={this.props.height}
                toolbarTop={60}
                toolbarLeft={40}
                showFullPageControl={false} />
            </MediaQuery>
            <MediaQuery maxWidth={650}>
              <OpenseadragonViewer
                image={this.props.item.image}
                containerID={this.props.item.id}
                height={this.props.height}
                toolbarTop={60}
                toolbarLeft={40}
                showFullPageControl={false}
                showNavigator={false} />
            </MediaQuery>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
});

module.exports = ItemShow;
