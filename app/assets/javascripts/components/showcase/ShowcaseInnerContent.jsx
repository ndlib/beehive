//app/assets/javascripts/components/showcase/ShowcaseInnerContent.jsx
var React = require("react");

var ShowcaseInnerContent = React.createClass({
  propTypes: {
    showcase: React.PropTypes.object,
    height: React.PropTypes.number.isRequired,
  },

  style: function() {
    return {
      position: "absolute",
      height: this.props.height + "px",
      top: 0,
      left: 0,
      overflowX: "visible",
      overflowY: "visible",
      paddingTop: "20px",
      marginLeft: '60vw',
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  },

  render: function() {
    return (
      <div className="showcase-inner animation-slidein" style={this.style()} >
        <ShowcaseTitle height={this.props.height} showcase={this.props.showcase} />
        <ShowcaseSections height={this.props.height} showcase={this.props.showcase} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseInnerContent;
