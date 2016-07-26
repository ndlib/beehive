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
  displayName: 'Section',

  propTypes: {
    section: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
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
      if(this.props.section.item.image){
        return "image";
      }
      else if(this.props.section.item.multimedia){
        return "video";
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
      case "video":
        return (<MultimediaCard section={this.props.section} />);
        break;
      case "audio":
        return (<MultimediaCard section={this.props.section} />);
        break;
      default:
        return (<div/>);
        break;
    }
  },

  render: function() {
    return (
      <mui.Card className="item" style={this.style()} onClick={this.onClick}>
        { this.card() }
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = SectionCard;
