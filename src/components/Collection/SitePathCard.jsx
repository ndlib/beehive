'use strict'
var React = require("react");
var mui = require('material-ui');

var SitePathCard = React.createClass({
  mixins: [
    require('../../mixins/CollectionUrlMixin.jsx')
  ],

  propTypes: {
    siteObject: React.PropTypes.object.isRequired,
    addNextButton: React.PropTypes.bool,
    fixedSize: React.PropTypes.bool,
    headerTitle: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      addNextButton: false,
      headerTitle: null,
      fixedSize: true,
    }
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.collectionObjectUrl(this.props.siteObject);
  },

  style: function() {
    return {
      position: "relative",
      cursor: "pointer",
      minHeight: '400px',
      height: this.props.fixedSize ? '400px' : 'auto'
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
        display: 'none'

    };
  },

  buttonStyle: function() {
    return {
      backgroundColor: "#2c5882",
    }
  },

  image: function () {
    var space = ' ';
    var re = new RegExp(space, 'g');
    if(this.props.siteObject.image && this.props.siteObject.image["thumbnail/medium"]) {
      return this.props.siteObject.image["thumbnail/medium"].contentUrl.replace(re, '%20');
    } else {
      return '/images/intro.jpg';
    }
  },

  nextButton: function() {
    if (this.props.addNextButton) {
      return (
        <mui.CardActions
          style={{position:'absolute', right:'10px', top: this.props.headerTitle != null ? '33px' : '363px'}}
          zDepth={2}
        >
          <mui.FloatingActionButton
            primary={true}
            linkButton={true}
            style={this.buttonStyle()}
            href={this.collectionObjectUrl(this.props.siteObject)}
            disableTouchRipple={true}
          >
            <mui.FontIcon className="material-icons">arrow_forward</mui.FontIcon>
          </mui.FloatingActionButton>
        </mui.CardActions>
      );
    }
  },

  headerTitle: function () {
    if (this.props.headerTitle) {
      return (<mui.CardTitle title={this.props.headerTitle} rootStyle={{height:'600px'}}/>);
    }
  },

  cardTitle: function() {
    return (<mui.CardTitle title={this.props.siteObject.name_line_1} subtitle={this.props.siteObject.name_line_2} />);
  },

  cardMedia: function () {
    return (
      <mui.CardMedia
        className="collection-site-path-card"
        style={{ backgroundImage:'url(' + this.image() + ')' }}
        overlay={ this.cardTitle() }>
      </mui.CardMedia>);
  },

  render: function() {
    return (
      <mui.Card onClick={this.onClick} style={this.style()} >
        {this.headerTitle()}
        {this.cardMedia()}
        {this.nextButton()}
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = SitePathCard;
