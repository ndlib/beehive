//app/assets/javascripts/components/layout/CollectionPageFooter.jsx
var React = require('react');
var mui = require('material-ui');
var MediaQuery = require('react-responsive');

var CollectionPageFooter = React.createClass({

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    height: React.PropTypes.number
  },

  getDefaultProps: function() {
    return { height: 50 };
  },

  render: function () {
    return (
      <MediaQuery minWidth={650}>
        <mui.Paper circle={false} rounded={false} zDepth={0} style={{ height: this.props.height + 'px' }}>
          <footer style={{ height: this.props.height + 'px' }}>
            <a href="http://library.nd.edu" className="hesburgh-logo">
              Hesburgh Logo
            </a>
            <a href="/" className="dec-logo">
              Dec Logo
            </a>
          </footer>
        </mui.Paper>
      </MediaQuery>
    );
  }
});

module.exports = CollectionPageFooter;
