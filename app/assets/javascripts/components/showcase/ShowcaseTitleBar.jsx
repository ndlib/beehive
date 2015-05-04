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

  render: function() {
    if (this.props.showcase) {
      return (
        <div className="showcases-title-bar" id="showcases-title-bar" style={this.style()}>
          <h2 style={this.titleStyle()} title={this.props.showcase.title}>
            {this.props.showcase.title}
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
