'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, { FlatButton } from 'material-ui';
var MediaQuery = require("react-responsive");
var Details = require('../../display/Details.jsx');
var OpenseadragonViewer = require('../../display/OpenseadragonViewer.jsx');
var MultimediaViewer = require('../../layout/MultimediaViewer.jsx');
import AddReferral from '../../modules/AddReferral.js';

var ItemContent = createReactClass({
  displayName: "ItemContent",

  propTypes: {
    item: PropTypes.object,
    additionalDetails: PropTypes.string,
    height: PropTypes.number.isRequired,
    minMediaHeight: PropTypes.number,
    // If splitting the space between media and meta
    // causes the media to go smaller than this, it
    // will switch to full screen media render
    mediaBottom: PropTypes.number,
    // Distance from bottom of media to bottom of viewport
  },

  getDefaultProps: function() {
    return {
      minMediaHeight: 300,
      mediaBottom: 200
    }
  },

  getInitialState: function() {
    return {
      zoom: false,
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
        background: "#444",
        top: 0,
        width: "100%",
      }
    } else {
      return {}
    }
  },

  imgStyles: function() {
    return {
      maxWidth: "100%",
      maxHeight: this.getHeight() - 60 + "px",
      display: "block",
      margin: "auto",
    }
  },

  getHeight: function() {
    var height = this.props.height - this.props.mediaBottom;
    if( height < this.props.minMediaHeight ){
      height = this.props.height;
    }
    if(this.state.zoom) {
      return window.innerHeight;
    }
    return height;
  },

  multimedia: function() {
    var height;
    if(this.props.item.media["@type"] === "AudioObject") {
      height = 40;
    }
    else  {
      height = this.getHeight();
    }

    return (
      <div className="item-detail-zoom" style={this.zoomStyles()}>
        <MultimediaViewer
          url={ this.props.item.media.embedUrl }
          autostart={ true }
          height={ height + "px" }
        />
      </div>
    );
  },

  toggleZoom: function() {
    return (
      <div style={{ background: "#444" }}>
        <FlatButton label="Toggle Zoom"
                        onClick={ () => { this.setState({ zoom: !this.state.zoom })} }
                        style={{ display: "block", margin: "auto" }}
                        labelStyle={{color: 'white'}}
        />
      </div>
    );
  },

  hasManuscript: function() {
    return (this.props.item && this.props.item.metadata && this.props.item.metadata.manuscript_url)
  },

  showManuscript: function () {
    if(this.hasManuscript()) {
      return (
        <div style={{ background: "#444" }}>
          <FlatButton label="View Manuscript"
                          onClick={ (event) => {
                            event.preventDefault()
                            window.open(AddReferral(this.props.item.metadata.manuscript_url.values[0].value));
                          } }
                          style={{ display: "block", margin: "auto" }}
                          labelStyle={{color: 'white'}}
          />
        </div>
      );
    }
    return null;

  },
  image: function() {
    var height = this.getHeight();

    if(this.state.zoom) {
      return (
        <div className="item-detail-zoom" style={this.zoomStyles()}>
          <MediaQuery minWidth={650}>
            <OpenseadragonViewer
              image={this.props.item.media}
              containerID={this.props.item.id}
              height={height - 145}
              toolbarTop={60}
              toolbarLeft={40}
              showFullPageControl={false} />
          </MediaQuery>
          <MediaQuery maxWidth={650}>
            <OpenseadragonViewer
              image={this.props.item.media}
              containerID={this.props.item.id}
              height={height - 145}
              toolbarTop={60}
              toolbarLeft={40}
              showFullPageControl={false}
              showNavigator={false} />
          </MediaQuery>
        </div>
      );
    } else {
      return (
        <div className="item-detail-zoom" style={ this.zoomStyles() }>
          <img src={ this.props.item.media.contentUrl } style={ this.imgStyles() } />
        </div>
      );
    }
  },

  details: function() {
    if (!this.state.zoom) {
      return (<Details item={this.props.item} additionalDetails={this.props.additionalDetails} showDetails={true} />);
    }
    return null;
  },

  render: function() {
    var prevLink, nextLink;
    if (this.props.item && this.props.item.media != null){
      if(this.props.item.media["@type"] == "ImageObject") {
        return (
          <div style={this.outerStyles()}>
            { this.image() }
            { this.hasManuscript() ? this.showManuscript() : this.toggleZoom() }
            { this.details() }
          </div>
        );
      } else if (this.props.item.media["@type"] == "AudioObject" || this.props.item.media["@type"] == "VideoObject") {
        return (
          <div style={this.outerStyles()}>
            { this.multimedia() }
            { this.details() }
          </div>
        );
      }
    }
    return (
      <div style={this.outerStyles()}>
        { this.showManuscript() }
        { this.details() }
      </div>
    );
  }
});

module.exports = ItemContent;
