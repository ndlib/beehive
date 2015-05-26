var React = require("react");

var StartShowcaseButton = React.createClass({
  displayName: "Start Showcase Button",

  propTypes: {
    collection: React.PropTypes.object,
  },

  style: function() {
    return {
    }
  },

  h2Style: function() {
    return {
      color: "black",
      fontFamily: "GPCMed",
      fontSize: "16px",
      fontWeight: "normal",
      lineHeight: "16px",
      margin: "0",
      padding: "0 0 .5vw",
      textTransform: "uppercase",
    }
  },

  startButton: function() {
    if(this.props.collection.showcases){
      if(this.props.collection.showcases.length > 0) {
        return (
            <div className="col-sm-4 well" style={this.style()}>
              <h2 style={this.h2Style()}>Continue to</h2>
              <ShowcaseCard showcase={this.props.collection.showcases[0]} />
            </div>
        );
      }
    }
    else {
      return (<div />);
    }
  },

  render: function() {
    return (
      <div>
        {this.startButton()}
      </div>
    );
  }
});

module.exports = StartShowcaseButton;
