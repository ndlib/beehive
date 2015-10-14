//app/assets/javascripts/components/showcase/ShowcaseInnerContent.jsx
var React = require("react");

var ShowcaseInnerContent = React.createClass({
  propTypes: {
    showcase: React.PropTypes.object,
    height: React.PropTypes.number.isRequired,
  },

  style: function() {
    var style = {
      position: "absolute",
      height: this.props.height + "px",
      top: 0,
      left: 0,
      overflowX: "visible",
      overflowY: "visible",
      paddingTop: "20px",
    };
    return style;
  },


  componentDidMount: function () {
    this.setState({animationRun: true });
  },


  shouldComponentUpdate: function(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  },

  render: function() {
    return (
      <div className="showcase-inner" style={this.style()} >
        <ShowcaseTitle height={this.props.height} showcase={this.props.showcase} />
        <ShowcaseSections height={this.props.height} showcase={this.props.showcase} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseInnerContent;
