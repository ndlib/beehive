import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { CardText, CardTitle } from 'material-ui'
const MoreOverlay = require('./MoreOverlay.jsx')

const TextCard = createReactClass({
  propTypes: {
    section: PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return {
      showMoreLink: false,
    }
  },

  componentDidMount: function () {
    if (this.showMoreLink()) {
      this.setState({
        showMoreLink: true,
      })
    }
  },

  titleStyle: function () {
    return {
      color: 'lightgrey',
    }
  },

  style: function () {
    return {
      color:'lightgrey',
      paddingTop:'0',
      maxWidth: Math.floor(window.innerWidth * 0.9) + 'px',
    }
  },

  showMoreLink: function () {
    if (document.getElementById(encodeURIComponent(this.props.section.name) + '-text')) {
      const textContent = document.getElementById(encodeURIComponent(this.props.section.name) + '-text')
      let testHeight = textContent.offsetParent.clientHeight
      if (document.getElementById(encodeURIComponent(this.props.section.name))) {
        testHeight -= document.getElementById(
          encodeURIComponent(this.props.section.name),
        ).offsetParent.clientHeight + 15
      }
      return (textContent.clientHeight > testHeight)
    }
    return false
  },

  overflowText: function () {
    if (this.showMoreLink()) {
      return (<MoreOverlay />)
    }
    return null
  },

  render: function () {
    const title = (
      <div
        id={encodeURIComponent(this.props.section.name)}
        className='sectionTitleContent'
      >{this.props.section.name}
      </div>
    )
    return (
      <div style={this.style()} className='text'>
        <CardTitle title={title} titleStyle={this.titleStyle()} />
        <CardText style={this.style()}>
          <div
            id={encodeURIComponent(this.props.section.name) + '-text'}
            className='sectionTextContent'
            dangerouslySetInnerHTML={{ __html: this.props.section.description }}
          />
          {this.overflowText()}
        </CardText>
      </div>
    )
  },
})

export default TextCard
