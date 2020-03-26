import React, { Component } from 'react'
import SiteIndex from '../components/SiteIndex'
import HoneycombURL from '../modules/HoneycombURL'

class SiteIndexPage extends Component {
  render () {
    return (
      <SiteIndex collections={HoneycombURL() + '/v1/collections/'} />
    )
  }
}

export default SiteIndexPage
