//app/assets/javascripts/components/ShowcaseTitleBar.jsx
var React = require('react');

var titleHeight = 16;
var marginBottom = 5;
var borderBottom = 1;

var ShowcaseTitleBar = React.createClass({
  mixins: [TitleConcatMixin, MuiThemeMixin],

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
    console.log(this);
    return {
      opacity: 1 - this.props.percentFade,
      borderBottomWidth: borderBottom + "px",
      padding: verticalPadding + "px 40px",
      marginBottom: marginBottom + "px",
      color: '#fff',
      fontFamily: 'GPCMed',
      fontSize: '16px',
      fontWeight: 'normal',
      letterSpacing: '1.1px',
      lineHeight: '16px',
      margin: 0,
      padding: 0,
      textTransform: 'uppercase',
      background: '-moz-linear-gradient(top, $title-gradient-top 0%, $title-gradient-bottom 100%)',
      background: '-webkit-linear-gradient(top, $title-gradient-bottom 0%, $title-gradient-top 100%)',
      background: 'linear-gradient(to bottom, $title-gradient-top 0%, $title-gradient-bottom 100%)',
      borderBottom: 'solid 1px $title-border',
      marginBottom: '5px',
      padding: '9px 40px',
      position: 'relative',
    };
  },

  titleStyle: function() {
    return {
      fontSize: titleHeight + "px",
      lineHeight: titleHeight + "px",
    };
  },

  name: function () {
    return this.props.showcase.name_line_1;
  },

  render: function() {
    if (this.props.showcase) {
      return (
        <div className="showcases-title-bar" id="showcases-title-bar" style={this.style()}>
          <h2 className="showcases-title-bar-title overflow-ellipsis" style={this.titleStyle()} title={this.name()}>
            <span className="title">{this.name()}</span>
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
