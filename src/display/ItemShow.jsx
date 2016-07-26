'use strict'
var React = require("react");
var mui = require('material-ui');
var MediaQuery = require("react-responsive");
var Details = require('../display/Details.jsx');
var OpenseadragonViewer = require('../display/OpenseadragonViewer.jsx');
var MultimediaViewer = require('../layout/MultimediaViewer.jsx')

var ItemShow = React.createClass({
  displayName: "Item Show",

  propTypes: {
    item: React.PropTypes.object,
    additionalDetails: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
    minMediaHeight: React.PropTypes.number, // If splitting the space between media and meta
                                            // causes the media to go smaller than this, it
                                            // will switch to full screen media render
    mediaBottom: React.PropTypes.number,    // Distance from bottom of media to bottom of viewport
  },

  getDefaultProps: function() {
    return {
      minMediaHeight: 300,
      mediaBottom: 200
    }
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
  multimedia: function() {
    var height;
    if(this.props.item.multimedia["@type"] === "AudioObject") {
      height = 40;
    }
    else  {
      height = this.props.height - this.props.mediaBottom;
      if( height < this.props.minMediaHeight ) {
        height = this.props.height;
      }
    }

    return (
      <div className="item-detail-zoom" style={this.zoomStyles()}>
        <MultimediaViewer
          url={ this.props.item.multimedia.embedUrl }
          autostart={ true }
          height={ height + "px" }
        />
      </div>
    );
  },
  image: function() {
    var height = this.props.height - this.props.mediaBottom;
    if( height < this.props.minMediaHeight ){
      height = this.props.height;
    }
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
  },

  render: function() {
    var prevLink, nextLink;
    if (this.props.item && this.props.item.image) {
      return (
        <div style={this.outerStyles()}>
          { this.props.item.image && this.image() }
          <Details item={this.props.item} additionalDetails={this.props.additionalDetails} showDetails={true} />
        </div>
      );
    } else if (this.props.item && this.props.item.multimedia) {
      return (
        <div style={this.outerStyles()}>
          { this.props.item.multimedia && this.multimedia() }
          <Details item={this.props.item} additionalDetails={this.props.additionalDetails} showDetails={true} />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
});

module.exports = ItemShow;
