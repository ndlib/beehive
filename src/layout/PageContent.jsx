//app/assets/javascripts/components/layout/PageContent.jsx
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, {Paper} from 'material-ui';

var PageContent = createReactClass({
  propTypes: {
    fluidLayout: PropTypes.bool,
  },

  getDefaultProps: function () {
    return({ fluidLayout: false })
  },

  classes: function () {
    if (this.props.fluidLayout) {
      return "container-fluid";
    } else {
      return "container";
    }
  },

  style: function() {
    if (this.props.fluidLayout) {
      return ({});
    } else {
      return ({
        padding: '0 8%',
        background: 'none',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0)'
      });
    }
  },

  render: function() {
    return (
      <Paper onClick={this.props.onClick} onMouseOver={this.props.onMouseOver} transitionEnabled={false} circle={false} rounded={false} style={this.style()} >
        {this.props.children}
      </Paper>
    );
  }
});

// each file will export exactly one component
module.exports = PageContent;
