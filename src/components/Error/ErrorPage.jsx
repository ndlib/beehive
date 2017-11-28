
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var PageHeader = require('../../layout/PageHeader.jsx')
var PageContent = require('../../layout/PageContent.jsx')

var ErrorPage = createReactClass({
  render: function () {
    var url = window.location.origin
    return (
      <div>
        <PageHeader branding />
        <PageContent>
          <div className='row row-fluid'>
            <div className='col-lg-12 bee-page-content'>
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='errorframe'>
                    <h1>Oops!</h1>
                    <p>There doesn't appear to be anything here at the moment.</p>
                    <p><a href={url}>Try the Digital Exhibits and Collections homepage.</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContent>
      </div>
    )
  },

})
module.exports = ErrorPage
