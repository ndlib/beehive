import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui'
var CloseButton = require('../../other/CloseButton.jsx');
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var PageTitleBar = createReactClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    height: PropTypes.number
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
      color: '#fffffff',
    }
  },

  closeButtonStyle: function() {
    return {
      marginLeft: 'auto',
      height: "100%",
      float: "right"
    };
  },

  render: function() {
    return (
      <Toolbar id="PageTitleBar" style={this.style()}>
        <ToolbarGroup key={0} style={{float:"left"}}>
          <ToolbarTitle text={this.props.title} style={this.titleBarStyle()} />
        </ToolbarGroup>
        <ToolbarGroup key={1} style={this.closeButtonStyle()}>
          <CloseButton alternate={true} height={this.props.height} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

// each file will export exactly one component
module.exports = PageTitleBar;
