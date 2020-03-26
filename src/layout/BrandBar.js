import React from 'react'
import { useMediaQuery } from '@material-ui/core'

const BrandBar = () => {
  const shouldShow = useMediaQuery('(min-width: 650px)')
  if (!shouldShow) {
    return null
  }
  return (
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
  )
}

export default BrandBar
