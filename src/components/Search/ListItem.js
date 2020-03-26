import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import RemoveMarkup from '../../modules/RemoveMarkup'
import ItemImage from './ItemImage'
import CollectionUrl from '../../modules/CollectionUrl'

const MyListItem = ({ item }) => {
  return (
    <Link to={CollectionUrl.itemObjectUrl(item)} title={item.name}>
      <ListItem button className='list-item'>
        <ListItemIcon>
          <div style={{ top: '4px', left: '16px', padding: '2px', width: '77px', height: '75px', margin: '0 12px' }}>
            <ItemImage item={item} size='small' />
          </div>
        </ListItemIcon>
        <ListItemText primary={RemoveMarkup(item.name)} secondary={RemoveMarkup(item.description)} />
        {item.metadata && item.metadata.manuscript_url && (
          <ListItemIcon>
            <img
              src='/images/pt.icon.drk.png'
              className='manuscript-icon'
              alt='Manifest Available'
              title='Manifest Available'
              style={{ height: '40px', width: '40px' }}
            />
          </ListItemIcon>
        )}
      </ListItem>
      <Divider style={{ marginLeft: '110px' }} />
    </Link>
  )
}

MyListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    metadata: PropTypes.shape({
      manuscript_url: PropTypes.string,
    }),
  }).isRequired,
}

export default MyListItem
