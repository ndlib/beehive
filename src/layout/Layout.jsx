import React from 'react'
import createReactClass from 'create-react-class'

const Layout = createReactClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  },
})

module.exports = Layout
