'use strict'
import React, { Component, PropTypes } from 'react';

import Section from '../components/Section/Section.jsx';
import CollectionUrl from '../modules/CollectionUrl.jsx'

class SectionPage extends Component {

  render() {
    return (
      <div>
        <Section
          collection={ CollectionUrl.remoteCollection(this.props.params.collectionID) }
          showcase={ this.props.params.showcaseID }
          section={ CollectionUrl.remoteSection(this.props.params.sectionID) }
        />
        {this.props.children}
      </div>
    )
  }
}

export default SectionPage;
