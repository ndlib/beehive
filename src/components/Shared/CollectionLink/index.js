import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import CollectionUrl from 'modules/CollectionUrl'

const CollectionLink = ({ collection, button, className, children }) => {
  const url = CollectionUrl.collectionUrl(collection)
  return button ? (
    <Button href={url} color='primary' classes={className}>{children}</Button>
  ) : (
    collection.external_url ? (
      <a href={url} className={className}>{children}</a>
    ) : (
      <Link to={url} className={className}>{children}</Link>
    )
  )
}

CollectionLink.propTypes = {
  collection: PropTypes.object.isRequired,
  button: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  children: PropTypes.node,
}

export default CollectionLink
