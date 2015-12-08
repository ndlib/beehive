'use strict'
var React = require("react");
var mui = require('material-ui');

var ShowcaseCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
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
    window.location = this.showcaseUrl(this.props.showcase);
  },

  style: function() {
    return {
      position: "relative",
      cursor: "pointer",
      minHeight: '500px',
      height: this.props.fixedSize ? '500px' : 'auto'
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

  image: function() {
    return this.props.showcase.image["thumbnail/medium"].contentUrl;
  },

  description: function() {
    if (this.props.showcase.description) {
      return (
        <mui.CardText style={{whiteSpace:'normal'}}>
          {this.props.showcase.description}
        </mui.CardText>
      );
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
            href={this.props.showcase['@id']}
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
    return (<mui.CardTitle title={this.props.showcase.name_line_1} subtitle={this.props.showcase.name_line_2} />);
  },

  cardMedia: function () {
    if (this.props.showcase.image) {
      return (
        <mui.CardMedia
          mediaStyle={{background:'url(' + this.image() + ')', height:'100%', width:'100%', backgroundSize:'cover', backgroundPosition:'center top'}}
          className="temp"
          style={{height: '400px', overflow:'hidden'}}
          overlay={this.cardTitle()}>
          <img src={this.image()}  style={this.imageSize()} />
        </mui.CardMedia>);
    } else {
      return (this.cardTitle());
    }
  },

  render: function() {
    return (
      <mui.Card onClick={this.onClick} style={this.style()} >
        {this.headerTitle()}
        {this.cardMedia()}
        {this.description()}
        {this.nextButton()}
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseCard;
