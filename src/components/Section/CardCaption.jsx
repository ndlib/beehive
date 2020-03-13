import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { CardContent } from '@material-ui/core'

const CardCaption = createReactClass({
  propTypes: {
    caption: PropTypes.string,
  },

  style: function () {
    return {
      position:'absolute',
      bottom:'0',
      left:'0',
      right:'0',
      padding:'0',
      color: 'lightgrey',
      background:'rgba(0,0,0,.45)',
      width: '100%',
    }
  },

  innerStyle: function () {
    return {
      padding:'10px',
    }
  },

  render: function () {
    if (this.props.caption) {
      return (
        <CardContent style={this.style()} className='caption'>
          <div dangerouslySetInnerHTML={{ __html: this.props.caption }} style={this.innerStyle()} />
        </CardContent>
      )
    }
    return (<div />)
  },
})

export default CardCaption
