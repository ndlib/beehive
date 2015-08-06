'use strict'
var React = require('react');

var TitleBar = React.createClass({
  render: function() {
    var content = this.props.children;
    if (!content) {
      content = (
        <a className="navbar-brand" href="/"><i className="glyphicon glyphicon-home"></i> Digital Exhibits <i>and</i> Collections</a>
      );
    }

    return (
      <div className="title-bar large">
        <div className="container-fluid">
          <div className="row">
            <div className="navbar-header">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = TitleBar;
