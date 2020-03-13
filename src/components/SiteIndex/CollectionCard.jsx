import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardMedia, CardHeader, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CollectionUrl from '../../modules/CollectionUrl.jsx'

const style = {
  position: 'relative',
  cursor: 'pointer',
  maxHeight:'450px',
  // padding: theme.spacing.desktopGutter,
  height:'100%',
  paddingBottom:'60px',
}

const imageSize = {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  margin: 'auto',
  minWidth:'50%',
  minHeight: '50%',
  maxWidth: 'initial',
  maxHeight:'initial',
  display: 'none',
}

const actionButtonsStyle = {
  position: 'absolute',
  bottom:'0',
  width: '100%',
  borderTopColor: 'rgba(0,0,0,0.12)',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
}

const exploreLabelStyle = {
  color: '#d9a91b',
}

const Header = ({ collection }) => {
  const titleStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  return (
    <CardHeader
      title={collection.name_line_1}
      titleStyle={titleStyle}
      subtitle={collection.name_line_2}
      subtitleStyle={titleStyle}
    />
  )
}

Header.propTypes = {
  collection: PropTypes.shape({
    name_line_1: PropTypes.string,
    name_line_2: PropTypes.string,
  }).isRequired,
}

class CollectionCard extends Component {
  constructor(props) {
    super(props)

    this.cardMedia = this.cardMedia.bind(this)
    this.collectionLink = this.collectionLink.bind(this)
  }

  cardMedia() {
    const image = this.props.collection.image
      ? this.props.collection.image['thumbnail/medium'].contentUrl.replace(new RegExp(' ', 'g'), '%20')
      : '/images/marble.jpg'

    return (
      <CardMedia
        mediaStyle={{
          background:'url("' + image + '")',
          paddingBottom:'46.85%',
          backgroundSize:'cover',
          backgroundPosition:'top center',
          height:'100%',
          width:'100%',
          overflow:
          'hidden',
        }}
        className='temp'
        style={{ overflow:'hidden' }}
      >
        <img src={image} style={imageSize} alt='' />
      </CardMedia>)
  }

  collectionLink() {
    if (this.props.collection.external_url) {
      return (
        <a href={CollectionUrl.collectionUrl(this.props.collection)}>
          {this.props.headerTitle && (
            <CardHeader title={this.props.headerTitle} />
          )}
          {this.cardMedia()}
          <Header collection={this.props.collection} />
        </a>
      )
    }
    return (
      <Link to={CollectionUrl.collectionUrl(this.props.collection)}>
        {this.props.headerTitle && (
          <CardHeader title={this.props.headerTitle} />
        )}
        {this.cardMedia()}
        <Header collection={this.props.collection} />
      </Link>
    )
  }

  render() {
    return (
      <Card style={style}>
        {this.collectionLink()}
        <CardActions style={actionButtonsStyle}>
          <Button
            href={CollectionUrl.collectionUrl(this.props.collection)}
            style={exploreLabelStyle}
          >
            Explore
          </Button>
        </CardActions>
      </Card>
    )
  }
}

CollectionCard.propTypes = {
  collection: PropTypes.object.isRequired,
  headerTitle: PropTypes.string,
}

// each file will export exactly one component
export default CollectionCard
