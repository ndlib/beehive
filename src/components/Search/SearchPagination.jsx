import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import SearchStore from '../../store/SearchStore'

const SearchPagination = () => {
  const [storeUpdated, setStoreUpdated] = useState()

  useEffect(() => {
    const action = () => setStoreUpdated(new Date())
    SearchStore.on('SearchStoreChanged', action)
    return () => SearchStore.off('SearchStoreChanged', action)
  })

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0
  }

  const pageLink = (i) => {
    const startIndex = (i - 1) * SearchStore.rowLimit
    const endIndex = Math.min(startIndex + SearchStore.rowLimit, SearchStore.found) - 1

    if (SearchStore.start === startIndex) {
      return (
        <span className='pagination-link' key={i}>{i}</span>
      )
    } else {
      const searchUrl = SearchStore.searchUri({ start: startIndex })
      const linkTitle = `${SearchStore.collection.name_line_1} | Items: ${startIndex + 1}-${endIndex + 1}`

      return (
        <Link key={i} to={searchUrl} className='pagination-link' onClick={scrollToTop} title={linkTitle}>{i}</Link>
      )
    }
  }

  const pageLinks = (() => {
    const startNum = Math.max(0, SearchStore.start - SearchStore.rowLimit)
    const backLink = SearchStore.searchUri({ start: startNum })
    const forwardLink = SearchStore.searchUri({ start: SearchStore.start + SearchStore.rowLimit })
    let lastIndex = Math.floor(SearchStore.found / SearchStore.rowLimit)
    if (SearchStore.found > SearchStore.rowLimit) {
      if (SearchStore.found % SearchStore.rowLimit !== 0) {
        lastIndex += 1
      }
    }

    return (
      <React.Fragment key={storeUpdated}>
        {SearchStore.start > 0 && (
          <Link key='back' to={backLink} rel='prev' onClick={scrollToTop}>
            <ArrowBackIcon className='material-icons' style={{ fontSize: '1em' }} />
          </Link>
        )}
        {[...Array(lastIndex).keys()].map(index => pageLink(index + 1))}
        {SearchStore.start + SearchStore.rowLimit < SearchStore.found && (
          <Link key='next' to={forwardLink} rel='next' onClick={scrollToTop}>
            <ArrowForwardIcon className='material-icons' style={{ fontSize: '1em' }} />
          </Link>
        )}
      </React.Fragment>
    )
  })()

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
          {pageLinks}
        </nav>
      </div>
    </div>
  )
}

export default SearchPagination
