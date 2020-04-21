import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import SearchStore from 'store/SearchStore'
import SearchActions from 'actions/SearchActions'

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

const FacetOption = ({ field, facet, shouldHide }) => {
  const valueOnClick = (e) => {
    const values = e.currentTarget.getAttribute('value').split('|')
    if (SearchStore.facetOption && SearchStore.facetOption.some(opt => (
      opt.name === values[0] && opt.value === values[1]
    ))) {
      SearchStore.removeSelectedFacet({ name: values[0], value: values[1] })
    } else {
      SearchActions.setSelectedFacet({ name: values[0], value: values[1] })
    }
  }

  const isSelected = SearchStore.facetOption && SearchStore.facetOption.some(opt => (
    field === opt.name && facet.name === opt.value
  ))

  const classes = useStyles()
  const value = field + '|' + facet.name

  if (!facet.name.trim() || (shouldHide && !isSelected)) {
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

FacetOption.propTypes = {
  field: PropTypes.string.isRequired,
  facet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  shouldHide: PropTypes.bool,
}

export default React.memo(FacetOption)
