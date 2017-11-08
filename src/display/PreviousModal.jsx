//app/assets/javascripts/components/PreviousSection.jsx
var React = require('react');

const PrevNext = require('../modules/PrevNextUtils.jsx')

var PreviousModal = React.createClass({
  mixins: [CollectionUrlMixin, CurrentThemeMixin],

  displayName: 'Previous Modal Link',

  propTypes: {
    url: React.PropTypes.string.isRequired,
    offsetTop: React.PropTypes.number,
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
      className="prev-button half-circle-button"
      style={PrevNext.buttonStyles(this.props.offsetTop, this.getCurrentPallette().accent3Color)}
    >
      <i className="material-icons">chevron_left</i>
    </a>
    );
  }
});

// each file will export exactly one component
module.exports = PreviousModal;
