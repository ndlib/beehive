import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
const PageContent = require('../../layout/PageContent.jsx')

const SectionShowDescription = createReactClass({
  displayName: 'Section Show Description',
  propTypes: {
    section: PropTypes.object.isRequired,
    height: PropTypes.number,
  },

  styles: function () {
    if (this.props.height) {
      return {
        paddingTop: '15px',
        height: this.props.height + 'px',
        overflowY: 'scroll',
        maxWidth: '60em',
        margin: '0 auto',
      }
    } else {
      return {}
    }
  },

  render: function () {
    return (
      <PageContent>
        <div
          ref='sectionContent'
          style={this.styles()}
          dangerouslySetInnerHTML={{ __html:this.props.section.description }}
        />
      </PageContent>
    )
  },

})

module.exports = SectionShowDescription
