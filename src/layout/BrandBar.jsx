import React from 'react'
import createReactClass from 'create-react-class'
import MediaQuery from 'react-responsive'

const BrandBar = createReactClass({

  render: function () {
    return (
      <MediaQuery minWidth={650}>
        <div className='brand-bar'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-sm-6'>
                <a href='https://www.nd.edu' rel='nofollow'>University <i>of</i> Notre Dame</a>
              </div>
              <div className='col-sm-6'>
                <a className='pull-right' href='https://library.nd.edu' rel='nofollow'>Hesburgh Libraries</a>
              </div>
            </div>
          </div>
        </div>
      </MediaQuery>
    )
  },

})

module.exports = BrandBar
