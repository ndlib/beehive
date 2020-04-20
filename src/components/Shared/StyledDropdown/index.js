import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  flexContainer: {
    display: 'flex',
    padding: '15px 10px',
    alignItems: 'center',
  },
  label: {
    fontSize: '16px',
    color: 'white',
    margin: '0px 6px 0px 0px',
  },
  formControl: {
    display: 'inline-block',
    overflow: 'hidden',
    minWidth: '100px',
    verticalAlign: 'middle',
    backgroundColor: 'white',
    borderRight: '1px solid rgb(238, 238, 238)',
  },
  select: {
    border: 'none',
    borderRadius: '2px',
    boxShadow: 'none',
    appearance: 'none',
    backgroundColor: 'transparent',
    height: '38px',
    width: '100%',
    color: 'black',
    fontSize: '16px',
    '& .MuiSelect-select': {
      padding: '4px 24px 4px 6px',
      lineHeight: '38px',
    },
  },
  dropdownItem: {
    fontSize: '16px',
  },
})

const StyledDropdown = ({ label, storeValue, defaultValue, queryParamName, setStore, options, className }) => {
  const [dropdownValue, setDropdownValue] = useState(storeValue || defaultValue)
  const classes = useStyles()

  useEffect(() => {
    let newVal = dropdownValue
    // Get the query param from the url
    const queryParams = new URLSearchParams(window.location.search)
    const urlValue = queryParams.get(queryParamName)
    if (!storeValue && urlValue) {
      newVal = urlValue
    } else {
      newVal = storeValue || defaultValue
    }
    console.log('set ' + queryParamName + ' to ' + newVal)
    if (newVal !== dropdownValue) {
      setStore(dropdownValue)
    }
  }, [dropdownValue, defaultValue, queryParamName, storeValue, setStore])

  const handleChange = (event) => {
    setDropdownValue(event.target.value)
  }

  const labelId = label ? `${label.replace(' ', '')}DropdownLabel` : null
  return (
    <div className={label ? classes.flexContainer : null}>
      {label && (
        <InputLabel id={labelId} className={classes.label}>{label}:</InputLabel>
      )}
      <FormControl className={`${classes.formControl} ${className || ''}`}>
        <Select labelId={labelId} onChange={handleChange} value={dropdownValue} className={classes.select}>
          {options.map((option) => (
            <MenuItem key={option.name} value={option.name} className={classes.dropdownItem}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

StyledDropdown.propTypes = {
  label: PropTypes.string,
  storeValue: PropTypes.any,
  defaultValue: PropTypes.any,
  queryParamName: PropTypes.any,
  setStore: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string,
}

export default StyledDropdown
