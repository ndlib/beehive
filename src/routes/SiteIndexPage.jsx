import React, { Component } from 'react'
import SiteIndex from '../components/SiteIndex/SiteIndex.jsx'
import HoneycombURL from '../modules/HoneycombURL.js'

class SiteIndexPage extends Component {
  render () {
    return (
      <SiteIndex collections={HoneycombURL() + '/v1/collections/'} />
    )
  }
}

export default SiteIndexPage
