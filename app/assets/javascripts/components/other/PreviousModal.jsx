//app/assets/javascripts/components/PreviousSection.jsx
var React = require('react');

var PreviousModal = React.createClass({
  mixins: [CollectionUrlMixin, PrevNextMixin],

  displayName: 'Previous Modal Link',

  render: function() {
    var id = this.props.id;
    return (
    <a href="#" onClick={this.clickAction} className="prev-button half-circle-button">
      <div className="direction">&lsaquo;</div>
    </a>
    );
  }
});

// each file will export exactly one component
module.exports = PreviousModal;
