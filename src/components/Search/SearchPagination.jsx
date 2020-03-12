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

  scrollToTop: function () {
    document.documentElement.scrollTop = 0
  },

  pageLink: function (i) {
    const startIndex = (i - 1) * SearchStore.rowLimit
    const endIndex = Math.min(startIndex + SearchStore.rowLimit, SearchStore.found) - 1

    if (SearchStore.start === startIndex) {
      return (
        <span className='pagination-link' key={i}>{i}</span>
      )
    } else {
      const searchUrl = SearchStore.searchUri({ start: startIndex }) +
      '&compact=' + this.props.compact
      const linkTitle = `${SearchStore.collection.name_line_1} | Items: ${startIndex + 1}-${endIndex + 1}`

      return (
        <Link
          to={searchUrl}
          className='pagination-link'
          key={i}
          onClick={this.scrollToTop}
          title={linkTitle}
        >{i}
        </Link>
      )
    }
  },

  pageLinks: function () {
    const nodes = []
    // if not first page
    if (SearchStore.start !== 0) {
      const startNum = Math.max(0, SearchStore.start - SearchStore.rowLimit)
      const backLink = SearchStore.searchUri({ start: startNum }) + '&compact=' + this.props.compact
      nodes.push((
        <Link
          to={backLink}
          key='back'
          rel='prev'
          onClick={this.scrollToTop}
        >
          <i className='material-icons' style={{ fontSize: '1em' }}>arrow_back</i>
        </Link>
      ))
    }
    let last = Math.floor(SearchStore.found / SearchStore.rowLimit)
    const cappedFirst = 1
    const cappedLast = last + 1
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
      const forwardLink = SearchStore.searchUri({ start: SearchStore.start + SearchStore.rowLimit }) +
        '&compact=' + this.props.compact
      nodes.push((
        <Link
          to={forwardLink}
          key='next'
          rel='next'
          onClick={this.scrollToTop}
        > <i className='material-icons' style={{ fontSize: '1em' }}>arrow_forward</i>
        </Link>))
    }
    return nodes
  },

  render: function () {
    // people think of the first record as 1, not 0.
    // Am I not a people?
    // No, you are not.
    const startHuman = SearchStore.found > 0 ? SearchStore.start + 1 : 0
    const endHuman = Math.min(SearchStore.start + SearchStore.rowLimit, SearchStore.found)

    return (
      <div style={{ margin: '2em 0' }}>
        <div style={{ color:'rgba(0, 0, 0, 0.870588)', textAlign: 'right' }}>
          <nav className='pagination'>
            <span
              style={{
                marginRight:'15px',
                display:'inline-block',
                verticalAlign:'top',
              }}
            >Showing {startHuman} - {endHuman} of {SearchStore.found}
            </span>
            {this.pageLinks()}
          </nav>
        </div>
      </div>
    )
  },
})

export default SearchPagination
