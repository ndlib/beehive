import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
var SideNavButton = require('./SideNavButton.jsx')

var Scroller = createReactClass({
  propTypes: {
    target: PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return {
      element: null,
    }
  },

  onMouseDown: function (direction, event) {
    var scrollDelta = Math.ceil(this.state.element.clientWidth * (3 / 4))
    $(this.state.element).animate({ scrollLeft: (this.state.element.scrollLeft + scrollDelta * direction) }, 500)
  },

  componentDidMount: function () {
    this.setState({
      element: $(this.props.target).get(0),
    })
  },

  top: function () {
    return (this.props.height / 2)
  },

  maxScroll: function () {
    return this.state.element.scrollWidth - this.state.element.clientWidth
  },

  render: function () {
    var left
    var right

    if (this.state.element) {
      if (this.state.element.scrollLeft > 0) {
        left = (
          <SideNavButton onMouseDown={this.onMouseDown.bind(this, -1)} />
        )
      }

      if (this.state.element.scrollLeft < this.maxScroll() - 10) {
        right = (
          <SideNavButton onMouseDown={this.onMouseDown.bind(this, 1)} rightIcon />
        )
      }
    }
    return (
      <div>
        {left}
        {right}
      </div>
    )
  },
})

module.exports = Scroller
