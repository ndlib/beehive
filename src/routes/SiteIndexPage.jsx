'use strict'
import React, { Component, PropTypes } from 'react';

import SiteIndex from '../components/SiteIndex/SiteIndex.jsx'

class SiteIndexPage extends Component {
  render() {
    return (
      <SiteIndex collections={"http://localhost:3017" + "/v1/collections/"} />
    );
  }
}

export default SiteIndexPage;
