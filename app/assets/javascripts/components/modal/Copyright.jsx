//app/assets/javascripts/components/modal/Copyright.jsx
var React = require('react');

var Copyright = React.createClass({

  content: function() {
    return (<p><a href="http://www.nd.edu/copyright/">Copyright</a> {this.year()} <a href="http://www.nd.edu">University of Notre Dame</a></p>);
  },

  year: function () {
    return (new Date().getFullYear());
  },

  render: function () {
    return (
      <Modal id="copy" content={this.content()} />
    );
  }
});

module.exports = Copyright;
