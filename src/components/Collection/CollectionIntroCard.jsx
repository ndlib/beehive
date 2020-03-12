import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card, CardMedia, CardTitle } from 'material-ui'
import { Link } from 'react-router-dom'
const CollectionUrl = require('../../modules/CollectionUrl.jsx')

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
            overlay={<CardTitle title='Introduction' />}
          />
        </Card>
      </Link>
    )
  },
})

export default CollectionIntroCard
