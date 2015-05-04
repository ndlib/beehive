//app/assets/javascripts/components/layout/Card.jsx
var React = require('react');

var Card = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
  },

  className: function() {
    var className = "bee-card";
    if (this.props.className) {
      className += " " + this.props.className;
    }
    return className;
  },

  backgroundNode: function() {
    if (this.props.backgroundImage) {
      return (<CardBackground image={this.props.backgroundImage} />);
    }
  },

  render: function() {
    return (
      <div className={this.className()}>
        {this.backgroundNode()}
        {this.props.children}
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = Card;
