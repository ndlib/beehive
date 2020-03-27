import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import PageContent from '../../layout/PageContent'

const SectionShowDescription = createReactClass({
  displayName: 'Section Show Description',
  propTypes: {
    section: PropTypes.object.isRequired,
    height: PropTypes.number,
  },

  styles: function () {
    if (this.props.height) {
      return {
        height: `${this.props.height}px`,
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

export default SectionShowDescription
