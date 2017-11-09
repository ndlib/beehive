//app/assets/javascripts/components/NextSection.jsx
var React = require('react');

const PrevNext = require('../modules/PrevNextUtils.jsx')
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var NextModal = React.createClass({
  displayName: 'Next Modal Link',

  propTypes: {
    url: React.PropTypes.string.isRequired,
    offsetTop: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      offsetTop: window.innerHeight/2,
    };
  },

  render: function() {
    var id = this.props.id;
    return (
    <a
      href="#"
      onClick={PrevNext.clickAction(this.props.url)}
      className="next-button half-circle-button"
      style={PrevNext.buttonStyles(this.props.offsetTop, CurrentTheme.getCurrentPallette(this.context.muiTheme).accent3Color)}
    >
      <i className="material-icons">chevron_right</i>
    </a>
    );
  }
});

// each file will export exactly one component
module.exports = NextModal;
