'use strict'
import React, { Component, PropTypes } from 'react';

import Showcase from '../components/Showcase/Showcase.jsx';

class ShowcasePage extends Component {

  render() {
    return (
      <div>
        <Showcase
          collection={"http://localhost:3017" + "/v1/showcases/"
            + this.props.params.showcaseID}
        />
        {this.props.children}
      </div>
    )
  }
}

export default ShowcasePage;
