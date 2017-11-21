'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var Layout = createReactClass({
  render: function() {

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = Layout;
