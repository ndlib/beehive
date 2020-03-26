import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card, CardMedia, CardHeader } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CollectionUrl from '../../modules/CollectionUrl'

const CollectionIntroCard = createReactClass({
  propTypes: {
    collection: PropTypes.object.isRequired,
  },

  style: function () {
    return {
      position: 'relative',
      cursor: 'pointer',
      height: '400px',
    }
  },

  render: function () {
    return (
      <Link to={CollectionUrl.introUrl(this.props.collection)}>
        <Card style={this.style()}>
          <CardMedia
            className='collection-site-path-card'
            overlay={<CardHeader title='Introduction' />}
          />
        </Card>
      </Link>
    )
  },
})

export default CollectionIntroCard
