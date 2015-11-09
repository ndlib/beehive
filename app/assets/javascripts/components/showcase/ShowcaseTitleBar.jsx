//app/assets/javascripts/components/ShowcaseTitleBar.jsx
var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../other/CloseButton');

var ShowcaseTitleBar = React.createClass({
  mixins: [ MuiThemeMixin, CurrentThemeMixin, CollectionUrlMixin],

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
    return {
      opacity: 1 - this.props.percentFade,
      backgroundColor: this.getCurrentPallette().primary2Color,
    };
  },

  titleStyle: function () {
    return {
      color: this.getCurrentPallette().alternateTextColor,
    }
  },

  name: function () {
    return this.props.showcase.name_line_1;
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
            <mui.ToolbarTitle text={this.name()} style={this.titleStyle()} />
          </mui.ToolbarGroup>
          <mui.ToolbarGroup key={1} float="right">
            <CloseButton clickEvent={this.clickCloseButton} alternate={true} />
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
