import React from 'react'
import PropTypes from 'prop-types'
import { Button, List, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import FacetOption from './FacetOption'
import ConfigurationStore from 'store/ConfigurationStore'

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
  },
  showMore: {
    margin: '4px 8px 0px',
  },
})

const Facet = ({ field, label, values, limit, onShowMore }) => {
  const config = ConfigurationStore.facets.find(current => current.name === field) || {}
  const limitIncrement = config.limit || 5
  if (!limit) {
    limit = limitIncrement
  }

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
          <List style={{ width: '100%' }}>
            {values.slice(0, limit).map(valueObj => (
              <FacetOption key={valueObj.name} field={field} facet={valueObj} />
            ))}
            {limit < values.length && (
              <Button color='primary' onClick={() => onShowMore(field, limitIncrement)} className={classes.showMore}>
                Show More
              </Button>
            )}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </List>
  )
}

Facet.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  limit: PropTypes.number,
  onShowMore: PropTypes.func.isRequired,
}

export default Facet
