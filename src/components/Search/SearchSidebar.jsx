import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import SearchFacets from './SearchFacets.jsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    display: props => props.show ? 'block' : 'none',
    width: '25%',
    float: 'right',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    borderRadius: '2px',
    marginBottom: '16px',
  },
  header: {
    paddingLeft: '16px',
  },
})

const SearchSidebar = ({ show }) => {
  const classes = useStyles({
    show,
  })
  return (
    <Paper className={classes.container}>
      <h3 className={classes.header}>Filter Results</h3>
      <hr />
      <SearchFacets />
    </Paper>
  )
}

SearchSidebar.propTypes = {
  show: PropTypes.bool,
}

export default SearchSidebar
