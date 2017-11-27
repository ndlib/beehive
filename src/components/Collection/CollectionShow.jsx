'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, { Card, CardActions, CardMedia, CardTitle, FloatingActionButton, FontIcon, Paper } from 'material-ui'
import { Link } from 'react-router-dom'
var ConfigurationActions = require("../../actions/ConfigurationActions.js");
var Loading = require("../../other/Loading.jsx");

const CollectionUrl = require('../../modules/CollectionUrl.jsx')
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var CollectionShow = createReactClass({
  propTypes: {
    collection: PropTypes.object.isRequired,
  },

  collectionLoaded: function () {
    if (this.props.collection.name) {
      return true;
    } else {
      return false;
    }
  },

  image: function () {
    var space = ' ';
    var re = new RegExp(space, 'g');
    return this.props.collection.image["thumbnail/medium"].contentUrl.replace(re, '%20');
  },

  startUrl: function() {
    var url = CollectionUrl.introUrl(this.props.collection)

    if (!url) {
      url = CollectionUrl.startSitePathUrl(this.props.collection);
    }

    return url;
  },

  cover: function() {
    return ({
      backgroundSize:'cover',
      height:'40vw',
      maxHeight:'450px',
      backgroundImage: 'url("' + this.image() + '")',
      backgroundPosition:'top'
    });
  },

  startButton: function() {
    if (this.startUrl()) {
      return (
        <Link to={this.startUrl()} style={{position: 'absolute', right: '0', top: '-30px'}}>
        <FloatingActionButton
          backgroundColor='#2c5882'
        >
          <FontIcon className="material-icons">arrow_forward</FontIcon>
        </FloatingActionButton>
      </Link>
      );
    }
  },

  cardMediaSection: function() {
    if (this.props.collection.image) {
      var cardTitle = (null);
      if (this.props.collection.display_page_title) {
        cardTitle = (<CardTitle
          title={this.props.collection.name_line_1}
          titleStyle={{color:'white', fontSize:'34px', lineHeight:'46px'}}
          subtitle={this.props.collection.name_line_2}
          subtitleStyle={{color:'rgba(255,255,255,.8)', fontSize:'18px'}}
          style={CurrentTheme.pageWidth()}/>
        );
      }
      return (
        <CardMedia overlay={cardTitle}>
          <img src={this.image()} className="hide"/>
          <div className="cover" style={this.cover()}></div>
        </CardMedia>
      );
    } else {
      return (
        <CardTitle title={this.props.collection.name_line_1} subtitle={this.props.collection.name_line_2} />
      );
    }
  },

  render: function() {
    if (this.collectionLoaded()) {
      return (
        <Paper circle={false} rounded={false} >
          <Card>
            {this.cardMediaSection()}
          </Card>
          <CardActions style={CurrentTheme.pageWidth()} className="startButton">
            {this.startButton()}
          </CardActions>
        </Paper>
      );
    } else {
      return <Loading />;
    }
  }
});

module.exports = CollectionShow;
