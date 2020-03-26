import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

const TitleBar = createReactClass({
  propTypes: {
    children: PropTypes.node,
  },

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
