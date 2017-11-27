'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Page from '../components/Pages/Page.jsx';
import HoneycombURL from '../modules/HoneycombURL.js'

class PagesPage extends Component {

  render() {
    return (
      <div id="page-root">
        <Page
          collection={HoneycombURL() + "/v1/pages/"
            + this.props.match.params.pageID}
        />
        {this.props.children}
      </div>
    )
  }
}

export default PagesPage;
