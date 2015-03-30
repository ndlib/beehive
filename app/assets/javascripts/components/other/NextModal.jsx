//app/assets/javascripts/components/NextSection.jsx
var React = require('react');

var NextModal = React.createClass({
  mixins: [CollectionUrlMixin, PrevNextMixin],

  displayName: 'Next Modal Link',


  render: function() {
    var id = this.props.id;
    return (
    <a href="#" onClick={this.clickAction} className="next-button half-circle-button">
      <div className="direction">&rsaquo;</div>
    </a>
    );
  }
});

// each file will export exactly one component
module.exports = NextModal;
