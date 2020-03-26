import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from '../components/Pages/Page'
import HoneycombURL from '../modules/HoneycombURL'

class PagesPage extends Component {
  render () {
    return (
      <div id='page-root'>
        <Page
          collection={HoneycombURL() + '/v1/pages/' +
            this.props.match.params.pageID}
        />
        {this.props.children}
      </div>
    )
  }
}
PagesPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pageID: PropTypes.string,
    }),
  }),
  children: PropTypes.node,
}
export default PagesPage
