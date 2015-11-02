//app/assets/javascripts/components/ShowcaseTitleBar.jsx
var React = require('react');
var mui = require('material-ui');

var ShowcaseTitleBar = React.createClass({
  mixins: [MuiThemeMixin],

  displayName: 'Showcase Title Bar',

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    percentFade: React.PropTypes.number,
    height: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      percentFade: 0,
      height: 40,
    }
  },

  style: function() {
    return {
      opacity: 1 - this.props.percentFade,
    };
  },

  name: function () {
    return this.props.showcase.name_line_1;
  },

  render: function() {
    if (this.props.showcase) {
      return (
        <mui.Toolbar style={this.style()}>
          <mui.ToolbarTitle text={this.name()} description="Description!!" />
        </mui.Toolbar>
      );
    } else {
      return (<div />)
    }
  }
});

// each file will export exactly one component
module.exports = ShowcaseTitleBar;
