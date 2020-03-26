import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Showcase from '../components/Showcase/Showcase'
import HoneycombURL from '../modules/HoneycombURL'

class ShowcasePage extends Component {
  render () {
    return (
      <div>
        <Showcase
          collection={HoneycombURL() + '/v1/showcases/' +
            this.props.match.params.showcaseID}
        />
        {this.props.children}
      </div>
    )
  }
}
ShowcasePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      showcaseID: PropTypes.string,
    }),
  }),
  children: PropTypes.node,
}
export default ShowcasePage
