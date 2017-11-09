'use strict'
var React = require('react');
var mui = require('material-ui');
var ConfigurationActions = require("../../actions/ConfigurationActions.js");
var Loading = require("../../other/Loading.jsx");

const CollectionUrl = require('../../modules/CollectionUrl.jsx')
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var CollectionShow = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
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
        <mui.FloatingActionButton
          primary={true}
          linkButton={true}
          href={this.startUrl()}
        >
            <mui.FontIcon className="material-icons">arrow_forward</mui.FontIcon>
        </mui.FloatingActionButton>
      );
    }
  },

  cardMediaSection: function() {
    console.log(this.props.collection);
    if (this.props.collection.image) {
      var cardTitle = (null);
      if (this.props.collection.display_page_title) {
        cardTitle = (<mui.CardTitle
          title={this.props.collection.name_line_1}
          titleStyle={{color:'white', fontSize:'34px', lineHeight:'46px'}}
          subtitle={this.props.collection.name_line_2}
          subtitleStyle={{color:'rgba(255,255,255,.8)', fontSize:'18px'}}
          style={CurrentTheme.pageWidth()}/>
        );
      }
      return (
        <mui.CardMedia overlay={cardTitle}>
          <img src={this.image()} className="hide"/>
          <div className="cover" style={this.cover()}></div>
        </mui.CardMedia>
      );
    } else {
      return (
        <mui.CardTitle title={this.props.collection.name_line_1} subtitle={this.props.collection.name_line_2} />
      );
    }
  },

  render: function() {
    if (this.collectionLoaded()) {
      return (
        <mui.Paper circle={false} rounded={false} zDepth={0} >
          <mui.Card>
            {this.cardMediaSection()}
          </mui.Card>
          <mui.CardActions style={CurrentTheme.pageWidth()} className="startButton">
            {this.startButton()}
          </mui.CardActions>
        </mui.Paper>
      );
    } else {
      return <Loading />;
    }
  }
});

module.exports = CollectionShow;
