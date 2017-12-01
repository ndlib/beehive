import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
const ShowcaseTitleCard = require('./ShowcaseTitleCard.jsx')
const ShowcaseSections = require('./ShowcaseSections.jsx')

const ShowcaseInnerContent = createReactClass({
  propTypes: {
    showcase: PropTypes.object,
    height: PropTypes.number.isRequired,
  },

  style: function () {
    const style = {
      position: 'absolute',
      height: this.props.height + 'px',
      top: 0,
      left: 0,
      overflowX: 'visible',
      overflowY: 'visible',
      paddingTop: '20px',
      backgroundColor: 'rgba(0,0,0,0)',
    }
    return style
  },

  componentDidMount: function () {
    this.setState({ animationRun: true })
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps)
  },

  render: function () {
    return (
      <div className='showcase-inner' style={this.style()} >
        <ShowcaseTitleCard height={this.props.height} showcase={this.props.showcase} />
        <ShowcaseSections height={this.props.height} showcase={this.props.showcase} />
      </div>
    )
  },
})

module.exports = ShowcaseInnerContent
