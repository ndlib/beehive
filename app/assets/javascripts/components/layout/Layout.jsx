'use strict'
var React = require('react');

var Layout = React.createClass({
  render: function() {

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = Layout;
