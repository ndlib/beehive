var React = require("react");

var StartShowcaseButton = React.createClass({
  displayName: "Start Showcase Button",

  propTypes: {
    collection: React.PropTypes.object,
  },

  style: function() {
    return {
      float: "right",
      marginLeft: "1vw",
      marginRight: "9vw",
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
      padding: "0",
      textTransform: "uppercase",
    }
  },

  startButton: function() {
    if(this.props.collection.showcases){
      if(this.props.collection.showcases.length > 0) {
        return (
            <div className="col-sm-4 well" style={this.style()}>
              <ShowcaseCard showcase={this.props.collection.showcases[0]} />
              <h2 style={this.h2Style()}>Expolore Featured Content</h2>
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
