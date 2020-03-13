
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Snackbar } from '@material-ui/core'

const AttentionHelp = createReactClass({

  propTypes: {
    hasScrolled: PropTypes.bool,
  },

  getInitialState: function () {
    const state = {
      elapsed: false,
      open: true,
    }
    return state
  },

  componentDidMount: function () {
    this.timer = setInterval(this.tick, 9000)
  },

  componentWillUnmount: function () {
    clearInterval(this.timer)
  },

  tick: function () {
    this.setState({ elapsed: true })
  },

  style: function () {
    return {
    }
  },

  render: function () {
    let snackbar = (<div />)
    if (!this.props.hasScrolled && this.state.elapsed && this.state.open) {
      snackbar = (
        <div id='attentionHelp'>
          <Snackbar
            message='Scroll left to right to view the showcase.'
            autoHideDuration={5000}
            open={this.state.open}
            onRequestClose={() => this.setState({ open: false })}
            ref='attentionHelp'
            style={this.style()}
          />
        </div>
      )
    }
    return snackbar
  },
})

export default AttentionHelp
