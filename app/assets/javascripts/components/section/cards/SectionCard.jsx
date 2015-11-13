//app/assets/javascripts/components/Section.jsx
var React = require('react');
var mui = require('material-ui');
var ThemeColors = require('material-ui/lib/styles/colors');

var SectionCard = React.createClass({
  mixins: [CollectionUrlMixin, LoadRemoteMixin, CurrentThemeMixin],
  displayName: 'Section',

  propTypes: {
    section: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      hover: false
    };
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
      return "image";
    } else {
      return "text";
    }
  },

  imageStyle: function() {
    return {

    };
  },

  titleStyle: function() {
    return {
      color: "lightgrey",
    }
  },

  textStyle: function() {
    return {
      color: "lightgrey",
    };
  },

  onMouseEnter: function() {
    return this.setState({
      hover: true
    });
  },

  onMouseLeave: function() {
    return this.setState({
      hover: false
    });
  },

  onClick: function(event) {
    this.sectionOnClick();
/*
    event.preventDefault();
    window.location.hash = this.props.section.id;
*/
  },

  sectionName: function() {
    return "section-" + this.props.section.id;
  },

  imageCard: function() {
    if (this.props.section.item) {
      return (
        <div style={this.imageStyle()}>
          <mui.CardMedia>
            <img src={this.props.section.item.image['thumbnail/medium'].contentUrl} />
          </mui.CardMedia>
          <mui.CardText style={this.textStyle()}>
            <div dangerouslySetInnerHTML={{__html: this.props.section.caption}} />
          </mui.CardText>
        </div>
      );
    }
  },

  textCard: function () {
    if (this.props.section.description) {
      return (
        <div style={this.textStyle()}>
          <mui.CardTitle title={this.props.section.name} titleStyle={this.titleStyle()} />
          <mui.CardText style={this.textStyle()}>
            <div dangerouslySetInnerHTML={{__html: this.props.section.description}} />
          </mui.CardText>
        </div>
      );
    }
  },

  render: function() {
    return (
      <mui.Card className="item" style={this.style()} onClick={this.onClick}>
        { this.imageCard() }
        { this.textCard() }
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = SectionCard;
