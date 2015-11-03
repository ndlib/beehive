var React = require('react');
var ReactDOM = require('react-dom');

var minHeight = 160;

var PageHeightMixin = {
  getInitialState: function() {
    return {
      height: this.getHeight(),
    };
  },

  getHeight: function() {
    return window.innerHeight;
  },

  handleResize: function() {
    this.setState({
      height: this.getHeight(),
    });
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize, false);
    this.handleResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
}

module.exports = PageHeightMixin;
