'use strict'
import React, { Component, PropTypes } from 'react';

import Showcase from '../components/Showcase/Showcase.jsx';
import HoneycombURL from '../modules/HoneycombURL.js'

class ShowcasePage extends Component {

  render() {
    return (
      <div>
        <Showcase
          collection={HoneycombURL() + "/v1/showcases/"
            + this.props.params.showcaseID}
        />
        {this.props.children}
      </div>
    )
  }
}

export default ShowcasePage;
