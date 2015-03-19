//app/assets/javascripts/components/modal/Copyright.jsx
var React = require('react');

var Copyright = React.createClass({

  render: function () {
    return (
      <Modal id="copy" content="<p><a href='http://www.nd.edu/copyright/'>Copyright</a> 2014 <a href='http://www.nd.edu'>University of Notre Dame</a></p>" />
    );
  }
});

module.exports = Copyright;
