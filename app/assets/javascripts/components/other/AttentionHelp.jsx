"use strict"
var React = require("react");
var mui = require("material-ui");
var Snackbar = mui.Snackbar;

var AttentionHelp = React.createClass({
  mixins: [],

  propTypes: {
    start: React.PropTypes.number.isRequired,
    hasScrolled: React.PropTypes.bool
  },

  getInitialState: function(){
    var state = {
      elapsed: false,
    };
    return state;
  },

  componentDidMount: function() {
    this.timer = setInterval(this.tick, 9000);
  },

  componentWillUnmount: function() {
    clearInterval(this.timer);
  },

  tick: function() {
    this.setState({elapsed: true});
  },

  style: function() {
    return {
    };
  },

  render: function() {
    var snackbar = (<div/>);
    if(!this.props.hasScrolled && this.state.elapsed) {
      snackbar = (
        <div id="attentionHelp">
          <Snackbar
            message="Scroll left to right to view the showcase."
            autoHideDuration={5000}
            openOnMount={true}
            ref="attentionHelp"
            style={this.style()}
          />
        </div>
      );
    }
    return snackbar;

  }
});

module.exports = AttentionHelp;
