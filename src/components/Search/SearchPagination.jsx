import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Link } from 'react-router-dom'
const SearchStore = require('../../store/SearchStore.js')

const SearchPagination = createReactClass({
  propTypes: {
    compact: PropTypes.bool,
  },

  getDefaultProps: function () {
    return {
      compact: false,
    }
  },

  paginationButton: function () {
    return {
      border:'solid 1px',
      padding:'3px 5px',
      marginRight:'2px',
      verticalAlign:'top',
    }
  },

  scrollToTop: function () {
    document.documentElement.scrollTop = 0
  },

  pageLink: function (i) {
    if (SearchStore.start === (i - 1) * SearchStore.rowLimit) {
      return (
        <span style={this.paginationButton()} key={i}>{i}</span>
      )
    } else {
      const searchUrl = SearchStore.searchUri({ start: (i - 1) * SearchStore.rowLimit }) +
      '&compact=' + this.props.compact

      return (
        <Link
          to={searchUrl}
          style={this.paginationButton()}
          key={i}
          onClick={this.scrollToTop}
        >{i}</Link>
      )
    }
  },

  pageLinks: function () {
    let nodes = []
    // if not first page
    if (SearchStore.start !== 0) {
      const backLink = SearchStore.searchUri({ start: 0 }) + '&compact=' + this.props.compact
      nodes.push((<Link
        to={backLink}
        key='back'
        onClick={this.scrollToTop}
      > <i className='material-icons' style={{ fontSize: '1em' }}>arrow_back</i> </Link>))
    }
    let last = Math.floor(SearchStore.found / SearchStore.rowLimit)
    const cappedFirst = Math.max(1, Math.floor(SearchStore.start / SearchStore.rowLimit) - 2)
    const cappedLast = Math.min(Math.floor(SearchStore.start / SearchStore.rowLimit) + 4, last + 1)
    if (SearchStore.found > SearchStore.rowLimit) {
      if (SearchStore.found % SearchStore.rowLimit !== 0) {
        last += 1
      }
      for (let i = cappedFirst; i <= cappedLast; i++) {
        nodes.push(this.pageLink(i))
      }
    }

    // if not last page
    if (SearchStore.start + SearchStore.rowLimit < SearchStore.found) {
      const forwardLink = SearchStore.searchUri({
        start: SearchStore.rowLimit * (last - 1) }) +
        '&compact=' + this.props.compact
      nodes.push((
        <Link
          to={forwardLink}
          key='next'
          onClick={this.scrollToTop}
        > <i className='material-icons' style={{ fontSize: '1em' }}>arrow_forward</i> </Link>))
    }
    return nodes
  },

  render: function () {
    // people think of the first record as 1, not 0.
    // Am I not a people?
    // No, you are not.
    const startHuman = SearchStore.start + 1
    const endHuman = Math.min(SearchStore.start + SearchStore.rowLimit, SearchStore.found)
    return (
      <div style={{ margin: '2em 0 4em' }}>
        <div style={{ color:'rgba(0, 0, 0, 0.870588)', textAlign: 'right' }}>
          <div className='pagination'>
            <span
              style={{
                marginRight:'15px',
                display:'inline-block',
                verticalAlign:'top',
              }}>Showing {startHuman} - {endHuman} of {SearchStore.found}</span>
            {this.pageLinks()}
          </div>
        </div>
      </div>
    )
  },
})

module.exports = SearchPagination
