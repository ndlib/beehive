'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Section from '../components/Section/Section.jsx'
import CollectionUrl from '../modules/CollectionUrl.jsx'

class SectionPage extends Component {

  render() {
    return (
      <div>
        <Section
          collection={ CollectionUrl.remoteCollection(this.props.match.params.collectionID) }
          showcase={ this.props.match.params.showcaseID }
          section={ CollectionUrl.remoteSection(this.props.match.params.sectionID) }
        />
        {this.props.children}
      </div>
    )
  }
}

export default SectionPage
