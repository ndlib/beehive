var React = require('react');
var mui = require('material-ui');
var CloseButton = require('../../other/CloseButton.jsx');

var PageTitleBar = React.createClass({
  mixins: [
    require('../../mixins/MuiThemeMixin.jsx'),
    require('../../mixins/CurrentThemeMixin.jsx'),
    require('../../mixins/CollectionUrlMixin.jsx')
  ],

  propTypes: {
    title: React.PropTypes.object.isRequired,
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
      position: "fixed",
      height: this.getCurrentTheme().appBar.height + "px",
      top: this.getCurrentTheme().appBar.height + 1 + "px",
      opacity: this.state.opacity,
      backgroundColor: "rgba(51,51,51,1)",
      zIndex: '9',
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
      color: this.getCurrentPallette().alternateTextColor,
    }
  },

  clickCloseButton: function() {
    var url = window.location.pathname.split("/");
    window.location.href = "/" + url[1] + "/" + url[2];
  },

  render: function() {
    return (
      <mui.Toolbar style={this.style()}>
        <mui.ToolbarGroup key={0} float="left">
          <mui.ToolbarTitle text={this.props.title} style={this.titleBarStyle()} />
        </mui.ToolbarGroup>
        <mui.ToolbarGroup key={1} float="right">
          <CloseButton clickEvent={this.clickCloseButton} alternate={true} />
        </mui.ToolbarGroup>
      </mui.Toolbar>
    );
  }
});

// each file will export exactly one component
module.exports = PageTitleBar;
