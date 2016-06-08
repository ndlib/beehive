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

  componentWillMount: function() {
    document.body.classList.toggle('noscroll', true);
  },

  componentWillUnmount: function() {
    document.body.classList.toggle('noscroll', false);
  },

  outerStyles: function() {
    if (this.props.height) {
      return {
        height: this.props.height,
        position: "relative",
        overflow: "auto"
      }
    } else {
      return {}
    }
  },

  zoomStyles: function() {
    if (this.props.height) {
      return {
        background: "rgba(200,200,200,1)",
        top: 0,
        width: "100%",
      }
    } else {
      return {}
    }
  },

  image: function() {
    if(this.props.item.image){
      var height = this.props.height < 500 ? this.props.height : this.props.height - 300;
      return (
        <div className="item-detail-zoom" style={this.zoomStyles()}>
          <MediaQuery minWidth={650}>
            <OpenseadragonViewer
              image={this.props.item.image}
              containerID={this.props.item.id}
              height={height - 60}
              toolbarTop={60}
              toolbarLeft={40}
              showFullPageControl={false} />
          </MediaQuery>
          <MediaQuery maxWidth={650}>
            <OpenseadragonViewer
              image={this.props.item.image}
              containerID={this.props.item.id}
              height={height - 60}
              toolbarTop={60}
              toolbarLeft={40}
              showFullPageControl={false}
              showNavigator={false} />
          </MediaQuery>
        </div>
      );
    }
    return null;
  },

  metadata: function() {
    return (
      <Details item={this.props.item} additionalDetails={this.props.additionalDetails} showDetails={true} />
    );
  },

  render: function() {
    var prevLink, nextLink;
    if (this.props.item) {
      return (
        <div style={this.outerStyles()}>
          { this.image() }
          { this.metadata() }
        </div>
      );
    } else {
      return <Loading />;
    }
  }
});

module.exports = ItemShow;
