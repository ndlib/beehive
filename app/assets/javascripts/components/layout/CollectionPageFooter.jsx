//app/assets/javascripts/components/layout/CollectionPageFooter.jsx
var React = require('react');
var mui = require('material-ui');

var CollectionPageFooter = React.createClass({

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  render: function () {
    return (
      <mui.Paper circle={false} rounded={false} zDepth={0} >
        <footer>
          <a href="http://library.nd.edu">
            Hesburgh Logo
          </a>
          <a href="/">
            Dec Logo
          </a>
        </footer>
      </mui.Paper>
    );
  }
});

module.exports = CollectionPageFooter;
