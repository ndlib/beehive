var React = require('react');
var mui = require('material-ui');

var IndexPageFooter = React.createClass({

  render: function () {
    return (
      <mui.Paper circle={false} rounded={false} zDepth={0} >
        <footer>
          <a href="http://library.nd.edu" className="hesburgh-logo" style={{float: 'left'}}>
            Hesburgh Logo
          </a>
          <a href="/" className="connecting-logo">
            Connecting People to Knowledge
          </a>
        </footer>
      </mui.Paper>
    );
  }
});

module.exports = IndexPageFooter;
