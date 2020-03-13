import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import TitleBar from '../layout/TitleBar.jsx'
const PageHeader = createReactClass({
  displayName: 'Page Header',

  propTypes: {
    children: PropTypes.node,
  },

  style: function () {
    return {
      width: '100%',
    }
  },

  render: function () {
    let titleBar = this.props.children
    if (!titleBar) {
      titleBar = (
        <TitleBar />
      )
    }
    return (
      <div id='banner-wrapper'>
        <header id='banner' role='banner' className='home' style={this.style()}>
          <nav className=''>
            {titleBar}
          </nav>
        </header>
      </div>
    )
  },
})

export default PageHeader
