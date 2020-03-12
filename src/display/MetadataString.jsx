import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import AddReferral from '../modules/AddReferral.js'

const linkPattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi

const MetadataString = createReactClass({
  displayName: 'Metadata String',

  propTypes: {
    metadataField: PropTypes.object.isRequired,
  },

  render: function () {
    if (linkPattern.test(this.props.metadataField.value)) {
      const linkStyle = { wordBreak: 'break-word' }
      const matches = this.props.metadataField.value.split(linkPattern)
      const replacedNodes = matches.map(function (string, index) {
        if (linkPattern.test(string)) {
          string = AddReferral(string)
          return (
            <a href={string} key={index} target='_blank' rel='nofollow' style={linkStyle}>{string}</a>
          )
        } else {
          return (<div key={index}>{string}</div>)
        }
      })
      return (<div>{replacedNodes}</div>)
    } else {
      return (<div>{this.props.metadataField.value}</div>)
    }
  },
})

export default MetadataString
