import React from 'react'
import PropTypes from 'prop-types'
import { Button, List, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import FacetOption from './FacetOption'
import SearchStore from 'store/SearchStore'

const useStyles = makeStyles({
  facetAccordion: {
    minHeight: '16px !important',
    backgroundColor: 'rgba(0, 0, 0, 0.025)',
    padding: '0px 16px',
  },
  facetLabel: {
    margin: '0px !important',
  },
  expandIcon: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '0px',
    margin: '0px',
  },
  facetListContainer: {
    padding: '0px',
    flexDirection: 'column',
  },
  facetList: {
    width: '100%',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  showAll: {
    margin: '4px 8px 0px',
  },
})

const Facet = ({ field, label, options, limit, onShowAll }) => {
  // If a selected facet does not have any results (usually happens due to another filter), it will not be
  // returned as an option from Honeycomb. However, we need to treat it like it did, so the user does not
  // get confused and can deselect it.
  const selectedValues = (SearchStore.facetOption || []).filter(opt => opt.name === field).map(opt => opt.value)
  selectedValues.forEach(value => {
    const match = options.find(opt => opt.name === value)
    if (!match) {
      options.push({
        '@type': 'SearchFacetValue',
        name: value,
        value: value,
        count: 0,
      })
    }
  })

  const classes = useStyles()
  return (
    <List>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          id={`facet-${field}-header`}
          aria-controls={`facet-${field}-content`}
          expandIcon={<ExpandMoreIcon />}
          classes={{ root: classes.facetAccordion, content: classes.facetLabel, expandIcon: classes.expandIcon }}
        >
          <ListSubheader disableGutters>{label}</ListSubheader>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.facetListContainer}>
          <List className={classes.facetList}>
            {options.map((valueObj, index) => (
              <FacetOption key={valueObj.name} field={field} facet={valueObj} shouldHide={index >= limit} />
            ))}
          </List>
          {limit < options.length && (
            <Button color='primary' onClick={() => onShowAll(field)} className={classes.showAll}>
              Show All ({options.length - limit})
            </Button>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </List>
  )
}

Facet.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  limit: PropTypes.number,
  onShowAll: PropTypes.func.isRequired,
}

export default React.memo(Facet)
