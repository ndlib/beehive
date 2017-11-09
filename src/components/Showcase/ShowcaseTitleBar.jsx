//app/assets/javascripts/components/ShowcaseTitleBar.jsx
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../../other/CloseButton.jsx');
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var ShowcaseTitleBar = React.createClass({
  mixins: [
    require('../../mixins/MuiThemeMixin.jsx'),
  ],

  displayName: 'Showcase Title Bar',

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    percentFade: React.PropTypes.number,
    height: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      percentFade: 0,
      height: 35,
    }
  },

  style: function() {
    return {
      opacity: 1 - this.props.percentFade,
      backgroundColor: CurrentTheme.getCurrentPallette(this.context.muiTheme).primary2Color,
      height: this.props.height + 'px',
      zIndex: '200',
    };
  },

  titleBarStyle: function () {
    return {
      color: CurrentTheme.getCurrentPallette(this.context.muiTheme).alternateTextColor,
      lineHeight: this.props.height + "px",
    }
  },

  name: function () {
    return this.props.showcase.name_line_1;
  },

  closeButtonStyle: function() {
    return {
      marginLeft: 'auto',
    };
  },

  clickCloseButton: function() {
    var url = window.location.pathname.split("/");
    window.location.href = "/" + url[1] + "/" + url[2];
  },

  render: function() {
    if (this.props.showcase) {
      return (
        <mui.Toolbar style={this.style()}>
          <mui.ToolbarGroup key={0} float="left">
            <mui.ToolbarTitle text={this.name()} style={this.titleBarStyle()} />
          </mui.ToolbarGroup>
          <mui.ToolbarGroup key={1} float="right" style={this.closeButtonStyle()}>
            <CloseButton clickEvent={this.clickCloseButton} alternate={true} height={this.props.height}/>
          </mui.ToolbarGroup>
        </mui.Toolbar>
      );
    } else {
      return (<div />)
    }
  }
});

// each file will export exactly one component
module.exports = ShowcaseTitleBar;
