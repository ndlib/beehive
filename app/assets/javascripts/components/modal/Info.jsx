//app/assets/javascripts/components/modal/Info.jsx
var React = require('react');

var Info = React.createClass({

  content: function() {
    return (<div><p>Exhibits is a service of the <a href="http://library.nd.edu">Hesburgh Libraries of Notre Dame</a>.</p><p>For Technical Support call <a href="tel:5746316258">(574) 631-6258</a>  or email <a href="mailto:rfox2@nd.edu?subject=Support%20Request">rfox2@nd.edu</a>.</p></div>);
  },

  render: function () {
    return <Modal id="info" content={this.content()} />;
  }
});

module.exports = Info;