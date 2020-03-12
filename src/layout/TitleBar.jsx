import React from 'react'
import createReactClass from 'create-react-class'

const TitleBar = createReactClass({
  render: function () {
    let content = this.props.children
    if (!content) {
      content = (
        <a
          className='navbar-brand'
          href='/'
        ><i className='glyphicon glyphicon-home' /> Digital Exhibits <i>and</i> Collections
        </a>
      )
    }

    return null
  },
})

export default TitleBar
