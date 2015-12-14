var React = require('react');
var mui = require('material-ui');
var $ = require('jquery');
var theme = require('../../../themes/beehive');

var CollectionCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    cardHeight: React.PropTypes.string.isRequired
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.collectionUrl(this.props.collection);
  },

  style: function() {
    return {
      position: "relative",
      cursor: "pointer",
      height: this.props.cardHeight + 'px',
      //padding: theme.spacing.desktopGutter,
    };
  },

  imageSize: function() {
    return {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        margin: 'auto',
        minWidth:'50%',
        minHeight: '50%',
        maxWidth: 'initial',
        maxHeight:'initial',

    };
  },

  image: function() {
    if (this.props.collection.image) {
      return this.props.collection.image["thumbnail/medium"].contentUrl;
    } else {
      return '/images/marble.jpg';
    }
  },

  description: function() {
    if (this.props.collection.description) {
      return (
        <mui.CardText style={{height: '100px'}}>
          {$(this.props.collection.description).text()}
        </mui.CardText>
      );
    }
  },

  headerTitle: function () {
    if (this.props.headerTitle) {
      return (<mui.CardTitle title={this.props.headerTitle} />);
    }
  },

  cardTitle: function() {
    var titleStyle = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
    return (<mui.CardTitle title={this.props.collection.name_line_1}
                           titleStyle={titleStyle}
                           subtitle={this.props.collection.name_line_2}
                           subtitleStyle={titleStyle} />);
  },

  cardMedia: function () {
    //if (this.props.collection.image) {
      return (
        <mui.CardMedia
          mediaStyle={{position: 'absolute', height:'200%', width:'200%', overflow: 'hidden' }}
          className="temp"
          style={{height: '300px', overflow:'hidden'}}>
          <img src={this.image()}  style={this.imageSize()} />
        </mui.CardMedia>);
    //} else {
    //  return (this.cardTitle());
    //}
  },

  actionButtonsStyle: function() {
    return {
      position: "absolute",
      top: (this.props.cardHeight - 60) + 'px',
      width: '100%',
      borderTopColor: 'rgba(0,0,0,0.12)',
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
    };
  },

  exploreLabelStyle: function() {
    return { color: '#d9a91b' };
  },

  render: function() {
    return (
      <mui.Card onClick={this.onClick} style={this.style()} >
        {this.headerTitle()}
        {this.cardMedia()}
        {this.cardTitle()}
        <mui.CardActions style={this.actionButtonsStyle()} >
          <mui.FlatButton label="Explore" href={this.collectionUrl(this.props.collection)} labelStyle={ this.exploreLabelStyle() } />
        </mui.CardActions>
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionCard;
