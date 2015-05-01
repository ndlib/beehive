//app/assets/javascripts/components/layout/CardOverlay.jsx
var React = require('react');

var CardOverlay = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
  },

  style: function() {
    return {
      height: "100%",
      padding: "16px",
      backgroundImage: "linear-gradient(to bottom,rgba(0,0,0,0.5) 0,transparent 100%)",
      backgroundRepeat: "repeat-x",
      overflow: "hidden",
    };
  },

  render: function() {
    return (
      <div className="bee-card-overlay" style={this.style()}>
        {this.props.children}
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = CardOverlay;
