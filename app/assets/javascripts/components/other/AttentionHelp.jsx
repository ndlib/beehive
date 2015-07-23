"use strict"
let React = require("react");
let mui = require("material-ui");
let Snackbar = mui.Snackbar;
let AttentionHelp = React.createClass({
  mixins: [MuiThemeMixin],
  propTypes: function() {
    start: React.PropTypes.number.isRequired
  },
  getInitialState: function(){
    return { elapsed: 0 };
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
      bottom: "49px",
    };
  },

  render: function() {
    var elapsed = Math.round(this.state.elapsed / 1000);
    var snackbar = (<div/>);
    if(elapsed >= 5 && elapsed <= 15) {
      snackbar = (
        <div id="attentionHelp">
          <Snackbar
            message="Hey! You can scroll left to right."
            autoHideDuration={5000}
            openOnMount={true}
            ref="attentionHelp"
            style={this.style()}
          />
          <audio autoPlay>
            <source src="/assets/attention.mp3" type="audio/mpeg"/>
          </audio>
        </div>
      );
    }
    return snackbar;

  }
});

module.exports = AttentionHelp;
