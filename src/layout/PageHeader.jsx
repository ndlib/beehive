import React from 'react'
import createReactClass from 'create-react-class'
const TitleBar = require('../layout/TitleBar.jsx')
const PageHeader = createReactClass({
  displayName: 'Page Header',

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
