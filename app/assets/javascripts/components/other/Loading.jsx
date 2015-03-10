//app/assets/javascripts/components/Loading.jsx
var React = require('react');

var Loading = React.createClass({

  render: function() {
    return (<div className="loading"><img src="/images/ajax-loader.gif" /></div>)
  }

});

// each file will export exactly one component
module.exports = Loading;
