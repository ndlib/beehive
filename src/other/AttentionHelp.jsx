"use strict"
var React = require("react");
var mui = require("material-ui");
var Snackbar = mui.Snackbar;

var AttentionHelp = React.createClass({

  propTypes: {
    start: React.PropTypes.number.isRequired,
    hasScrolled: React.PropTypes.bool
  },

  getInitialState: function(){
    var state = {
      elapsed: false,
      open: true,
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
    if(!this.props.hasScrolled && this.state.elapsed && this.state.open) {
      snackbar = (
        <div id="attentionHelp">
          <Snackbar
            message="Scroll left to right to view the showcase."
            autoHideDuration={5000}
            open={this.state.open}
            onRequestClose={open => this.setState({false})}
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
