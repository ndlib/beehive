'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card, CardText, CardTitle } from 'material-ui'
var MediaQuery = require("react-responsive");
var Showdown = require('showdown');

var converter = new Showdown.Converter();

var ShowcaseTitleCard = createReactClass({
  propTypes: {
    showcase: PropTypes.object.isRequired,
    height: PropTypes.number,
  },

  outerStyle: function() {
    var style = {
      display: "inline-block",
      verticalAlign: "top",
      position: "relative",
      padding: "5px",
      textAlign: "center",
      overflow: 'hidden',
      width: '85vw',
      boxShadow: "none",
    };

    if (this.props.height) {
      style['height'] = this.props.height + "px";
    }

    return style;
  },

  headerStyle: function() {
    var marginTop;
    if (this.props.height) {
      var marginTop = Math.round(this.props.height * 0.15) + "px";
    }
    return {
      marginTop: marginTop,
      textShadow: "2px 2px 3px #333333",
      textTransform: "uppercase",
      color: "#fff",
      backgroundColor: "rgba(0,0,0,0.1)",
      whiteSpace:'normal',
      lineHeight:'2em !important',
    }
  },

  titleStyle: function() {
    return {
      color: "#fff",
      fontSize: "4vw",
      paddingBottom: "10px",
      lineHeight:'4.1vw'
    };
  },

  subtitleStyle: function() {
    return {
      color: "#fff",
      fontSize: "3vw",
      lineHeight:"3.1vw"
    };
  },

  textStyle: function() {
    return {
      color: "#fff",
      textShadow: "1px 1px 2px #333333",
      fontSize: "18px",
      backgroundColor: "rgba(0,0,0,0.1)",
      whiteSpace: 'normal'
    }
  },

  names: function() {
    var names = [];
    names.push(
      <h2 className="showcase-name-1" key={1}>{this.props.showcase.name_line_1}</h2>
    );
    if (this.props.showcase.name_line_2) {
      names.push(
        <br key="br" />
      );
      names.push(
        <h3 className="showcase-name-2" key={2}>{this.props.showcase.name_line_2}</h3>
      );
    }
    return names;
  },

  editTitle: function() {
    window.location = this.props.showcase.editUrl;
  },

  render: function() {
    var description;
    if (this.props.showcase.description) {
      description = this.props.showcase.description.toString();
    }

    return (
      <Card style={this.outerStyle()}>
        <CardTitle
          title={this.props.showcase.name_line_1}
          subtitle={this.props.showcase.name_line_2}
          style={this.headerStyle()}
          titleStyle={this.titleStyle() }
          subtitleStyle={this.subtitleStyle() }
          />
        <MediaQuery minWidth={650}>
          <CardText style={this.textStyle()} >
            {description}
          </CardText>
        </MediaQuery>
      </Card>
    )
    return (
      <div className="showcase-title-page" style={this.outerStyle()}>
        <div className="showcase-title-page-inner">
          <div className="showcase-title-container" style={this.headerStyle()}>
            {this.names()}
          </div>
          <br />
          <div className="showcase-title-description-container">
            <div className="showcase-title-description">{description}</div>
          </div>
          <div className="showcase-controlls">
            <img src="/images/touch.svg" className="touch" alt="Swipe Left or Right" title="Swipe Left or Right" />
            <img src="/images/scroll.svg" className="scroll" alt="Scroll with the Mouse Wheel" title="Scroll with the Mouse Wheel" />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ShowcaseTitleCard;
