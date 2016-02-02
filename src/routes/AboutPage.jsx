'use strict'
import React, { Component, PropTypes } from 'react';

import About from '../components/pages/About.jsx';
import HoneycombURL from '../modules/HoneycombURL.js'

class AboutPage extends Component {

  render() {
    return (
      <About
        collection={HoneycombURL() + "/v1/collections/"
          + this.props.params.collectionID + "/showcases"}
      />
    )
  }
}

export default AboutPage;
