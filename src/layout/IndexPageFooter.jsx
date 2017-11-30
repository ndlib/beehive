import React from 'react'
import createReactClass from 'create-react-class'
import { Paper } from 'material-ui'
import { Link } from 'react-router-dom'

const IndexPageFooter = createReactClass({

  render: function () {
    return (
      <Paper circle={false} rounded={false}>
        <footer>
          <Link to='http://library.nd.edu' className='hesburgh-logo' style={{ float: 'left' }}>
            Hesburgh Logo
          </Link>
          <Link to='/' className='connecting-logo'>
            Connecting People to Knowledge
          </Link>
        </footer>
      </Paper>
    )
  },
})

module.exports = IndexPageFooter
