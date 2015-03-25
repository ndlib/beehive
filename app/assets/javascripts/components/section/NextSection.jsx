//app/assets/javascripts/components/NextSection.jsx
var React = require('react');

var NextSection = React.createClass({
  mixins: [CollectionUrlMixin, PrevNextMixin],

  displayName: 'Next Section Link',


  render: function() {
    var section = this.props.section;
    return (
    <a href="#" onClick={this.clickAction} className="next-button half-circle-button">
      <div className="direction">&rsaquo;</div>
    </a>
    );
  }
});

// each file will export exactly one component
module.exports = NextSection;
