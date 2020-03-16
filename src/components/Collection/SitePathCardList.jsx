import React from 'react'
import PropTypes from 'prop-types'
import { GridList, GridListTile, useMediaQuery } from '@material-ui/core'
import SitePathCard from './SitePathCard.jsx'

const SitePathCardList = ({ sitePath, intro }) => {
  const columns = 1 +
    useMediaQuery('(min-width:650px)') + useMediaQuery('(min-width:1224px)') + useMediaQuery('(min-width:1725px)')

  return (sitePath.length > 0 || intro) ? (
    <GridList cols={columns} spacing={24} cellHeight='auto'>
      {intro && (
        <div key='intro'>{intro}</div>
      )}
      {sitePath.map(siteObject => (
        <GridListTile key={siteObject.name}>
          <SitePathCard siteObject={siteObject} />
        </GridListTile>
      ))}
    </GridList>
  ) : null
}

SitePathCardList.propTypes = {
  sitePath: PropTypes.array.isRequired,
  intro: PropTypes.element,
}

export default SitePathCardList
