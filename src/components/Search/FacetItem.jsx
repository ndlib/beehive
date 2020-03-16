import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import SearchStore from '../../store/SearchStore.js'
import SearchActions from '../../actions/SearchActions.js'

const useStyles = makeStyles({
  container: {
    paddingTop: '6px',
    paddingBottom: '6px',
  },
  checkbox: {
    minWidth: '24px',
    width: '24px',
  },
  textContainer: {
    margin: '0px',
    marginLeft: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countText: {
    height: 'auto',
    overflow: 'visible',
  },
})

const FacetItem = ({ field, facet }) => {
  const valueOnClick = (e) => {
    const values = e.currentTarget.getAttribute('value').split('|')
    if (SearchStore.facetOption) {
      for (let i = 0; i < SearchStore.facetOption.length; i++) {
        if (SearchStore.facetOption[i].name === values[0] && SearchStore.facetOption[i].value === values[1]) {
          SearchStore.removeSelectedFacet({ name: values[0], value: values[1] })
          return
        }
      }
    }
    SearchActions.setSelectedFacet({ name: values[0], value: values[1] })
  }

  let isSelected = false
  if (SearchStore.facetOption) {
    for (let i = 0; i < SearchStore.facetOption.length; i++) {
      if (facet.name === decodeURIComponent(SearchStore.facetOption[i].value)) {
        isSelected = true
      }
    }
  }

  const classes = useStyles()
  const value = field + '|' + facet.name

  if (!facet.name.trim()) {
    return null
  }
  return (
    <ListItem
      key={facet.name}
      button
      value={value}
      onClick={valueOnClick}
      className={`facet ${classes.container}`}
    >
      <ListItemIcon className={classes.checkbox}>
        {isSelected ? (
          <CheckBoxIcon className='material-icons' />
        ) : (
          <CheckBoxOutlineBlankIcon className='material-icons' />
        )}
      </ListItemIcon>
      <ListItemText
        primary={facet.name}
        secondary={`(${facet.count})`}
        classes={{ root: classes.textContainer, secondary: classes.countText }}
      />
    </ListItem>
  )
}

FacetItem.propTypes = {
  field: PropTypes.string.isRequired,
  facet: PropTypes.object.isRequired,
}

export default FacetItem
