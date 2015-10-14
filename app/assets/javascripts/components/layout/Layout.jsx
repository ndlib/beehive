'use strict'
var React = require('react');
var mui = require('material-ui');

var Layout = React.createClass({
  render: function() {

    return (
      <mui.AppCanvas>
        {this.props.children}
      </mui.AppCanvas>
    );
  }
});

// each file will export exactly one component
module.exports = Layout;
