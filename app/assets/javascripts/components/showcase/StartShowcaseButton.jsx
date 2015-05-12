var React = require("react");

var StartShowcaseButton = React.createClass({
  displayName: "Start Showcase Button",

  propTypes: {
    collection: React.PropTypes.object,
  },

  startButton: function() {
    if(this.props.collection.showcases.length > 0){
      return (
        <div>
          <div className="col-md-12">
          <hr />
            <h2>Start the Exhibit</h2>
          </div>
          <div className="col-md-4">&nbsp;</div>
          <div className="col-md-4">
            <ShowcaseCard showcase={this.props.collection.showcases[0]} />
          </div>
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  },

  render: function() {
    return this.startButton();
  }
});

module.exports = StartShowcaseButton;
