'use strict'
import React, { Component, PropTypes } from 'react';

import About from '../components/pages/About.jsx';

class AboutPage extends Component {

  render() {
    return (
      <About
        collection={"http://localhost:3017" + "/v1/collections/"
          + this.props.params.collectionID + "/showcases"}
      />
    )
  }
}

export default AboutPage;
