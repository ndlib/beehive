'use strict'
var React = require('react');
var mui = require('material-ui');
var ThemeColors = require('material-ui/lib/styles/colors');
var TextCard = require("./TextCard.jsx");
var ImageCard = require("./ImageCard.jsx");
var MultimediaCard = require("./MultimediaCard.jsx");

var SectionCard = React.createClass({
  mixins: [
    require('../../mixins/CollectionUrlMixin.jsx'),
    require('../../mixins/LoadRemoteMixin.jsx'),
    require('../../mixins/CurrentThemeMixin.jsx')
  ],

  propTypes: {
    section: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      fullItem: {},
      itemLoaded: false,

    }
  },

  style: function() {
    var styles = {
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      marginRight: '20px',
      marginLeft: (this.props.section.has_spacer ? '15em' : '0px'),
      height: this.props.height + 'px',
      cursor: 'pointer',
      lineHeight: '0px',
      backgroundColor: "rgba(51,51,51,0.95)",
      border: this.sectionType() == "image" ? 'solid 3px #fff' : "none",
    };
    if (this.sectionType() == "text") {
      styles["maxWidth"] = "33em";
    }

    return styles;
  },

  sectionType: function() {
    if (this.props.section.item) {
      if(this.props.section.item.media){
        return "image";
      }
      else if(this.props.section.item.multimedia){
        return "multimedia";
      }
    } else {
      return "text";
    }
  },

  onClick: function(event) {
    this.sectionOnClick();
  },

  card: function() {
    switch(this.sectionType()) {
      case "image":
        return (<ImageCard section={this.props.section} />);
        break;
      case "text":
        return (<TextCard section={this.props.section} />);
        break;
      case "multimedia":
        return (<MultimediaCard section={this.props.section} />);
        break;
      default:
        return (<div/>);
        break;
    }
  },

  manifestIcon: function(item) {
    if(item && item.metadata && item.metadata.manuscript_url) {
      console.log(item)
      return (<img src="/images/pt.icon.drk.png" className="manifest-icon" alt="Manifest Available" title="Manifest Available" style={{position: 'absolute', right: '0', top: '0', maxWidth: '5%', height: 'auto'}}/>)
    }
    return null
  },

  render: function() {
    return (
      <mui.Card className="item" style={this.style()} onClick={this.onClick}>
        { this.card() }
        {this.manifestIcon(this.props.section.item)}
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = SectionCard;
