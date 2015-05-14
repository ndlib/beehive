var React = require("react");

var StartShowcaseButton = React.createClass({
  displayName: "Start Showcase Button",

  propTypes: {
    collection: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      collection: {},
    };
  },

  componentDidMount: function() {
    if ("object" == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      this.loadRemoteCollection();
    }
  },

  startButton: function() {
    if(this.props.collection.showcases){
      return (
        <div>
          <div className="col-md-12">
          <hr />
            <h2>Explore Featured Content</h2>
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
