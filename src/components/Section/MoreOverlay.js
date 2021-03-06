import React from 'react'
import createReactClass from 'create-react-class'

const MoreOverlay = createReactClass({

  style: function () {
    return {
      position: 'absolute',
      bottom: '0',
      left: '0',
      zIndex: '2',
      height: '60px',
      lineHeight: '60px',
      width: '100%',
      textAlign: 'center',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,1) 55%,rgba(0,0,0,1) 100%)',

    }
  },

  render: function () {
    return (<div style={this.style()}>MORE</div>)
  },
})

export default MoreOverlay
