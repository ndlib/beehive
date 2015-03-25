//app/assets/javascripts/components/PreviousSection.jsx
var React = require('react');

var PreviousSection = React.createClass({
  mixins: [CollectionUrlMixin, PrevNextMixin],

  displayName: 'Previous Section Link',

  render: function() {
    var section = this.props.section;
    return (
    <a href="#" onClick={this.clickAction} className="prev-button half-circle-button">
      <div className="direction">&lsaquo;</div>
    </a>
    );
  }
});

// each file will export exactly one component
module.exports = PreviousSection;
