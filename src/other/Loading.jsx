//app/assets/javascripts/components/Loading.jsx
var React = require('react');
var mui = require('material-ui');

var Loading = React.createClass({

  render: function() {
    return (<mui.CircularProgress mode="indeterminate" size={.5} />)
  }

});

// each file will export exactly one component
module.exports = Loading;
