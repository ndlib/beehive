import React, { Component } from 'react'
import PropTypes from 'prop-types'
import About from '../components/Pages/About.jsx'
import HoneycombURL from '../modules/HoneycombURL.js'

class AboutPage extends Component {
  render () {
    return (
      <About
        collection={HoneycombURL() + '/v1/collections/' +
          this.props.match.params.collectionID + '/showcases'}
      />
    )
  }
}
AboutPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      collectionID: PropTypes.string,
    }),
  }),
}

export default AboutPage
