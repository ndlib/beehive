//app/assets/javascripts/components/layout/Card.jsx
var React = require('react');

var Card = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
  },

  render: function() {
    var className = "bee-card";
    if (this.props.className) {
      className += " " + this.props.className;
    }
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = Card;
