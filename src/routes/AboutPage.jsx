'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import About from '../components/pages/About.jsx';
import HoneycombURL from '../modules/HoneycombURL.js'

class AboutPage extends Component {

  render() {
    return (
      <About
        collection={HoneycombURL() + "/v1/collections/"
          + this.props.match.params.collectionID + "/showcases"}
      />
    )
  }
}

export default AboutPage;
