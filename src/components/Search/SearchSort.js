import React, { useState, useEffect } from 'react'
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchActions from '../../actions/SearchActions'
import SearchStore from '../../store/SearchStore'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    padding: '15px 10px',
    alignItems: 'center',
  },
  label: {
    fontSize: '16px',
    color: 'white',
    margin: '0px',
  },
  formControl: {
    display: 'inline-block',
    borderRadius: '2px',
    overflow: 'hidden',
    minWidth: '120px',
    verticalAlign: 'middle',
    marginLeft: '5px',
    backgroundColor: 'white',
  },
  sortSelect: {
    border: 'none',
    borderRadius: '2px',
    boxShadow: 'none',
    appearance: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    color: 'black',
    fontSize: '16px',
    '& .MuiSelect-select': {
      padding: '4px 6px',
    },
  },
  dropdownItem: {
    fontSize: '16px',
  },
})

const SearchSort = () => {
  const [sortOption, setSortOption] = useState(SearchStore.sortOption || SearchStore.sorts[0].value)
  const classes = useStyles()

  useEffect(() => {
    let newVal = sortOption
    // Get the sort query param from the url
    const regex = /\S+&sort=/
    if (!sortOption && window.location.search.match(regex)) {
      newVal = window.location.search.replace(regex, '').split('&')[0]
    } else {
      newVal = SearchStore.sortOption
    }
    if (newVal !== sortOption) {
      SearchActions.setSort(sortOption)
    }
  }, [sortOption])

  const handleChange = (event) => {
    setSortOption(event.target.value)
  }

  if (SearchStore.sorts.length <= 0) {
    return null
  }

  return (
    <div className={classes.container}>
      <InputLabel id='sortOptionsDropdownLabel' className={classes.label}>Sort By:</InputLabel>
      <FormControl className={classes.formControl}>
        <Select
          labelId='sortOptionsDropdownLabel'
          onChange={handleChange}
          value={sortOption}
          className={classes.sortSelect}
        >
          {SearchStore.sorts.map((option) => (
            <MenuItem key={option.value} value={option.value} className={classes.dropdownItem}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SearchSort
