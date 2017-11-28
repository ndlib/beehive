'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Showcase from '../components/Showcase/Showcase.jsx'
import HoneycombURL from '../modules/HoneycombURL.js'

class ShowcasePage extends Component {

  render() {
    return (
      <div>
        <Showcase
          collection={HoneycombURL() + "/v1/showcases/"
            + this.props.match.params.showcaseID}
        />
        {this.props.children}
      </div>
    )
  }
}

export default ShowcasePage
