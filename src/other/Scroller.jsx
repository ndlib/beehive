import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
const SideNavButton = require('./SideNavButton.jsx')
const $ = require('jquery')

const Scroller = createReactClass({
  propTypes: {
    target: PropTypes.string.isRequired,
    height: PropTypes.number,
  },

  getInitialState: function () {
    return {
      element: null,
    }
  },

  onMouseDown: function (direction) {
    const scrollDelta = Math.ceil(this.state.element.clientWidth * (3 / 4))
    $(this.state.element).animate({ scrollLeft: (this.state.element.scrollLeft + scrollDelta * direction) }, 500)
  },

  scrollLeft: function () {
    this.onMouseDown(-1)
  },

  scrollRight: function () {
    this.onMouseDown(1)
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
    let left
    let right

    if (this.state.element) {
      if (this.state.element.scrollLeft > 0) {
        left = (
          <SideNavButton onMouseDown={this.scrollLeft} />
        )
      }

      if (this.state.element.scrollLeft < this.maxScroll() - 10) {
        right = (
          <SideNavButton onMouseDown={this.scrollRight} rightIcon />
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
