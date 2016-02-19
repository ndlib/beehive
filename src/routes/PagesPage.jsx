'use strict'
import React, { Component, PropTypes } from 'react';

import Page from '../components/Pages/Page.jsx';
import HoneycombURL from '../modules/HoneycombURL.js'

class PagesPage extends Component {

  render() {
    return (
      <div>
        <Page
          collection={HoneycombURL() + "/v1/pages/"
            + this.props.params.pageID}
        />
        {this.props.children}
      </div>
    )
  }
}

export default PagesPage;
