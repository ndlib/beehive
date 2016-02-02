'use strict'
var React = require('react');
var mui = require('material-ui');

var CollectionShow = React.createClass({
  mixins: [
    require('../../mixins/CollectionUrlMixin.jsx'),
    require('../../mixins/CurrentThemeMixin.jsx')
  ],

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

  viewExhibitUrl: function() {
    var url = this.introUrl(this.props.collection)

    if (!url) {
      url = this.firstShowcaseUrl(this.props.collection.showcase);
    }

    return url;
  },

  cover: function() {
    return ({
      backgroundPosition:'center',
      backgroundSize:'cover',
      height:'40vw',
      maxHeight:'450px',
      backgroundImage: 'url(' + this.image() + ')',
      backgroundPosition:'top'
    });
  },

  firstExhibitLink: function() {
    if (this.viewExhibitUrl()) {
      return (
        <mui.FloatingActionButton
          primary={true}
          linkButton={true}
          href={this.viewExhibitUrl()}
        >
            <mui.FontIcon className="material-icons">arrow_forward</mui.FontIcon>
        </mui.FloatingActionButton>
      );
    }
  },

  cardMediaSection: function() {
    if (this.props.collection.image) {
      var cardTitle = (null);
      if (this.props.collection.display_page_title) {
        cardTitle = (<mui.CardTitle
          title={this.props.collection.name_line_1}
          titleStyle={{color:'white', fontSize:'34px', lineHeight:'46px'}}
          subtitle={this.props.collection.name_line_2}
          subtitleStyle={{color:'rgba(255,255,255,.8)', fontSize:'18px'}}
          style={this.pageWidth()}/>
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
            <mui.CardActions style={this.pageWidth()} className="startButton">
              {this.firstExhibitLink()}
            </mui.CardActions>
          </mui.Card>
          <mui.CardActions style={this.pageWidth()} className="startButton">
              {this.firstExhibitLink()}
            </mui.CardActions>
        </mui.Paper>
      );
    } else {
      return <Loading />;
    }
  }
});

module.exports = CollectionShow;
