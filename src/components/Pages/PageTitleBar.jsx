var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../../other/CloseButton.jsx');
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var PageTitleBar = React.createClass({
  mixins: [
    require('../../mixins/MuiThemeMixin.jsx'),
  ],

  propTypes: {
    title: React.PropTypes.object.isRequired,
    height: React.PropTypes.number
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      height: 35,
    };
  },

  getInitialState: function() {
    return {
      opacity: 1,
    }
  },

  componentDidMount: function() {
    //window.onscroll = this.onScroll;
  },

  style: function() {
    return {
      height: this.props.height + "px",
      opacity: this.state.opacity,
      backgroundColor: "rgba(51,51,51,1)",
      zIndex: '1',
    };
  },

  onScroll: function(event) {
    var element = event.target.scrollingElement;
    var a = element.scrollTop / element.scrollHeight;
    var percentVisible = Math.log2(1 + a * 10.0);
    this.setState({
      opacity: percentVisible,
    });
  },

  titleBarStyle: function () {
    return {
      lineHeight: this.props.height + "px",
      color: CurrentTheme.getCurrentPallette(this.context.muiTheme).alternateTextColor,
    }
  },

  closeButtonStyle: function() {
    return {
      marginLeft: 'auto',
      height: "100%",
    };
  },

  clickCloseButton: function() {
    var url = window.location.pathname.split("/");
    window.location.href = "/" + url[1] + "/" + url[2];
  },

  render: function() {
    return (
      <mui.Toolbar id="PageTitleBar" style={this.style()}>
        <mui.ToolbarGroup key={0} float="left">
          <mui.ToolbarTitle text={this.props.title} style={this.titleBarStyle()} />
        </mui.ToolbarGroup>
        <mui.ToolbarGroup key={1} float="right" style={this.closeButtonStyle()}>
          <CloseButton clickEvent={this.clickCloseButton} alternate={true} height={this.props.height} />
        </mui.ToolbarGroup>
      </mui.Toolbar>
    );
  }
});

// each file will export exactly one component
module.exports = PageTitleBar;
