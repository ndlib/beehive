//app/assets/javascripts/components/layout/PageContent.jsx
var React = require('react');
var mui = require('material-ui');

var PageContent = React.createClass({
  propTypes: {
    fluidLayout: React.PropTypes.bool,
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
        width: '960px',
        margin: '0 auto',
        background: 'none',
        position: 'relative',
        //top: '50px',
      });
    }
  },

  render: function() {
    return (
      <mui.Paper circle={false} rounded={false} zDepth={0} style={this.style()} >
        {this.props.children}
      </mui.Paper>
    );
  }
});

// each file will export exactly one component
module.exports = PageContent;
