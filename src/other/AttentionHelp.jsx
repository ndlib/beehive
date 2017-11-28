"use strict"
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Snackbar } from 'material-ui'

var AttentionHelp = createReactClass({

  propTypes: {
    start: PropTypes.number.isRequired,
    hasScrolled: PropTypes.bool
  },

  getInitialState: function(){
    var state = {
      elapsed: false,
      open: true,
    }
    return state
  },

  componentDidMount: function() {
    this.timer = setInterval(this.tick, 9000)
  },

  componentWillUnmount: function() {
    clearInterval(this.timer)
  },

  tick: function() {
    this.setState({elapsed: true})
  },

  style: function() {
    return {
    }
  },

  render: function() {
    var snackbar = (<div/>)
    if(!this.props.hasScrolled && this.state.elapsed && this.state.open) {
      snackbar = (
        <div id="attentionHelp">
          <Snackbar
            message="Scroll left to right to view the showcase."
            autoHideDuration={5000}
            open={this.state.open}
            onRequestClose={() => this.setState({open: false})}
            ref="attentionHelp"
            style={this.style()}
          />
        </div>
      )
    }
    return snackbar

  }
})

module.exports = AttentionHelp
