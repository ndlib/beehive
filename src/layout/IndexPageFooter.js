import React from 'react'
import createReactClass from 'create-react-class'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'

const IndexPageFooter = createReactClass({

  render: function () {
    return (
      <Paper square>
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

export default IndexPageFooter
