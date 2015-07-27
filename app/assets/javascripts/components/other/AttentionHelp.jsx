"use strict"
var React = require("react");
var mui = require("material-ui");
var Snackbar = mui.Snackbar;

var AttentionHelp = React.createClass({
  mixins: [MuiThemeMixin],

  propTypes: {
    start: React.PropTypes.number.isRequired,
    hasScrolled: React.PropTypes.bool
  },

  getInitialState: function(){
    var state = {
      elapsed: 0,
    };
    return state;
  },

  componentDidMount: function() {
    this.timer = setInterval(this.tick, 1000);

  },

  componentWillUnmount: function() {
    clearInterval(this.timer);
  },

  tick: function() {
    this.setState({elapsed: new Date() - this.props.start});
  },

  style: function() {
    return {
      bottom: "54px",
    };
  },

  render: function() {
    var elapsed = Math.round(this.state.elapsed / 1000);
    // we'll load it before we want to play it so there isn't a delay
    var snackbar = (<source src="/attention.mp3" type="audio/mpeg"/>);
    var audioPlay = ""
    var storage = JSON.parse(sessionStorage.getItem("AudioPlayed"));

    if(!this.props.hasScrolled && elapsed >= 5 && elapsed <= 15) {
    if(!storage) {
        audioPlay = (
          <audio autoPlay>
            <source src="/attention.mp3" type="audio/mpeg"/>
          </audio>
        );
        sessionStorage.setItem("AudioPlayed", JSON.stringify({audioPlayed: true}));
      }

      snackbar = (
        <div id="attentionHelp">
          <Snackbar
            message="Scroll left to right to view the showcase."
            autoHideDuration={5000}
            openOnMount={true}
            ref="attentionHelp"
            style={this.style()}
          />
          {audioPlay}
        </div>
      );
    }
    return snackbar;

  }
});

module.exports = AttentionHelp;
