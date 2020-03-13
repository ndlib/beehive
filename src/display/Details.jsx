import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const MetadataList = require('../display/MetadataList.jsx')

const Styles = {
  // The outer containing div for this component
  outer: {
    boxShadow: '0 -5px 5px -5px rgba(0, 0, 0, 0.16), 0 -5px 5px -5px rgba(0, 0, 0, 0.23)',
    margin: '0 auto 60px',
    position: 'relative',
    width: '100%',
    zIndex: 0,
  },
  // The details Paper
  details: {
    backgroundColor: '#fff',
    color: '#555',
    display: 'block',
    fontSize: '16px',
    padding: '10px',
    paddingTop: '35px',
    opacity: '0.8',
    margin: '0 auto 60px',
    width: '100%',
    maxWidth: '60em',
  },
}

const Details = createReactClass({
  propTypes: {
    item: PropTypes.object,
    additionalDetails: PropTypes.string,
    showDetails: PropTypes.bool,
    printable: PropTypes.bool,
  },

  getDefaultProps: function () {
    return {
      showDetails: true,
      printable: true,
    }
  },

  getInitialState: function () {
    return {
      showDetails: this.props.showDetails,
    }
  },

  toggleDetails: function () {
    this.setState({
      showDetails: !this.state.showDetails,
    })
  },

  arrowIcon: function () {
    return this.state.showDetails ? (
      <ArrowForwardIcon className='material-icons' style={{ verticalAlign:'top', margin:'5px 10px 5px 0px' }} />
    ) : (
      <ArrowBackIcon className='material-icons' style={{ verticalAlign:'top', margin:'5px 10px 5px 0px' }} />
    )
  },

  details: function () {
    if (this.state.showDetails) {
      return (
        <div
          className='item-details'
          style={Styles.details}
        >
          <div
            className='additional-details'
            dangerouslySetInnerHTML={{ __html: this.props.additionalDetails }}
          />
          <MetadataList
            metadata={this.props.item.metadata}
            id={this.props.item.id}
            printable={this.props.printable}
          />
        </div>
      )
    } else {
      return null
    }
  },

  render: function () {
    return (
      <Paper style={Styles.outer}>
        {this.details()}
      </Paper>
    )
  },
})

export default Details
