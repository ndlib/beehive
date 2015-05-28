//app/assets/javascripts/components/ShowcaseTitleBar.jsx
var React = require('react');

var titleHeight = 16;
var marginBottom = 5;
var borderBottom = 1;

var ShowcaseTitleBar = React.createClass({
  displayName: 'Showcase Title Bar',

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    percentFade: React.PropTypes.number,
    height: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      percentFade: 0,
      height: 40,
    }
  },

  style: function() {
    var verticalPadding = (this.props.height - (titleHeight + marginBottom + borderBottom)) / 2;
    return {
      opacity: 1 - this.props.percentFade,
      borderBottomWidth: borderBottom + "px",
      padding: verticalPadding + "px 40px",
      marginBottom: marginBottom + "px",
    };
  },

  titleStyle: function() {
    return {
      fontSize: titleHeight + "px",
      lineHeight: titleHeight + "px",
    };
  },

  name: function () {
    if (this.props.showcase.name_line_2) {
      return this.props.showcase.name_line_1 + this.nameSpacer() + this.props.showcase.name_line_2;
    }
    return this.props.showcase.name_line_1;
  },

  nameSpacer: function () {
    if (this.props.showcase.name_line_2) {
      return ": ";
    }
    return "";
  },

  render: function() {
    if (this.props.showcase) {
      return (
        <div className="showcases-title-bar" id="showcases-title-bar" style={this.style()}>
          <h2 className="showcases-title-bar-title overflow-ellipsis" style={this.titleStyle()} title={this.name}>
          <span className="title">{this.props.showcase.name_line_1}{this.nameSpacer()}</span>&nbsp;
          <span className="subtitle">{this.props.showcase.name_line_2}</span>
          </h2>
        </div>
      );
    } else {
      return (<div />)
    }
  }
});

// each file will export exactly one component
module.exports = ShowcaseTitleBar;
