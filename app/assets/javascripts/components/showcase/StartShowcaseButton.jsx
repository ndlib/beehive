var React = require("react");

var StartShowcaseButton = React.createClass({
  displayName: "Start Showcase Button",

  propTypes: {
    collection: React.PropTypes.object,
  },

  startButton: function() {
    if(this.props.collection.showcases){
      if(this.props.collection.showcases.length > 0) {
        return (
          <ShowcaseCard showcase={this.props.collection.showcases[0]}  addNextButton={true} headerTitle="Next Showcase"/>
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
