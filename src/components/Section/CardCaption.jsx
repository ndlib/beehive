import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { CardText } from 'material-ui'

var CardCaption = createReactClass({
  propTypes: {
    caption: PropTypes.string,
  },

  style: function() {
    return {
      position:'absolute',
      bottom:'0',
      left:'0',
      right:'0',
      padding:'0',
      color: "lightgrey",
      background:'rgba(0,0,0,.45)',
      width: '100%',
    }
  },

  innerStyle: function() {
    return {
      padding:'10px'
    }
  },

  render: function() {
    if (this.props.caption) {
      return (<CardText style={this.style()} className="caption">
        <div dangerouslySetInnerHTML={{__html: this.props.caption}} style={this.innerStyle()}/>
      </CardText>)
    }
    return (<div/>)
  },
})

// each file will export exactly one component
module.exports = CardCaption
