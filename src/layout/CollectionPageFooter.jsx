//app/assets/javascripts/components/layout/CollectionPageFooter.jsx
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, { Paper } from 'material-ui'
import { Link } from 'react-router-dom'
var MediaQuery = require('react-responsive');

var CollectionPageFooter = createReactClass({

  propTypes: {
    collection: PropTypes.object.isRequired,
    height: PropTypes.number
  },

  getDefaultProps: function() {
    return { height: 50 };
  },

  render: function () {
    return (
      <MediaQuery minWidth={650}>
        <Paper circle={false} rounded={false} style={{ height: this.props.height + 'px' }}>
          <footer style={{ height: this.props.height + 'px' }}>
            <a href="http://library.nd.edu" className="hesburgh-logo">
              Hesburgh Logo
            </a>
            <Link to="/" className="dec-logo">
              Dec Logo
            </Link>
          </footer>
        </Paper>
      </MediaQuery>
    );
  }
});

module.exports = CollectionPageFooter;
