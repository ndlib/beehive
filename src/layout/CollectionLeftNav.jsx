
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, { Divider, Drawer, FontIcon, FlatButton, MenuItem } from 'material-ui'
import { Link } from 'react-router-dom'
var Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
}
const CollectionUrl = require('../modules/CollectionUrl.jsx')
const CurrentTheme = require('../modules/CurrentTheme.jsx')

var CollectionLeftNav = createReactClass({
  propTypes: {
    collection: PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return {
      sitePath: [],
      open: false,
    }
  },

  componentWillMount: function () {
    if (this.props.collection['site_path']) {
      this.setState({
        sitePath: this.props.collection['site_path'],
      })
    }
  },

  componentDidMount: function () {
    if (this.props.collection['site_path']) {
      return
    }
    var url = this.props.collection['@id'] + '/site_path'

    $.ajax({
      context: this,
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function (result) {
        this.setState({
          sitePath: result.site_path,
        })
      },
      error: function (request, status, thrownError) {
        // Should we redirect here? It's probably not necessary since it's not
        // the primary content of the page...
        // window.location = window.location.origin + '/404'
        console.log('Error retrieving showcase list ' + thrownError)
      },
    })
  },

  menuItemAction: function (url) {
    window.location = url
  },

  dropDownOptions: function () {
    var options = []
    var collectionUrl = CollectionUrl.collectionUrl(this.props.collection)
    var aboutUrl = CollectionUrl.aboutUrl(this.props.collection)
    var introUrl = CollectionUrl.introUrl(this.props.collection)
    var browseUrl = CollectionUrl.browseUrl(this.props.collection)

    options.push((
      <Link
        to={collectionUrl}
        key='collectionUrlLink'
        onClick={() => { this.setState({ open: false }) }}
      >
        <MenuItem primaryText='Home' key='home' />
      </Link>
    ))

    if (this.props.collection.enable_browse) {
      options.push((
        <Link
          to={browseUrl}
          key='browseUrlLink'
          onClick={() => { this.setState({ open: false }) }}
        >
          <MenuItem primaryText='Browse Collection' key='browse' />
        </Link>
      ))
    }

    if (this.props.collection.about) {
      options.push((
        <Link
          to={aboutUrl}
          key='aboutUrl'
          onClick={() => { this.setState({ open: false }) }}
        >
          <MenuItem primaryText='About' key='about' />
        </Link>
      ))
    }
    options.push((<Divider key='divider' />))

    if (introUrl) {
      options.push((
        <Link
          to={introUrl}
          key='introUrl'
          onClick={() => { this.setState({ open: false }) }}
        >
          <MenuItem primaryText='Introduction' key='intro' />
        </Link>
      ))
    }

    this.state.sitePath.forEach(function (siteObject) {
      var url = CollectionUrl.collectionObjectUrl(siteObject)
      var name = siteObject.name || siteObject.name_line_1
      options.push((
        <Link
          to={url}
          key={siteObject.id}
          onClick={() => { this.setState({ open: false }) }}
        >
          <MenuItem
            primaryText={name}
            className='collection-left-nav-item' />
        </Link>
      ))
    }.bind(this))

    return options
  },

  buttonStyle: function () {
    return ({
      paddingTop: '5px',
      paddingBottom: '5px',
      marginBottom: 0,
      height: 'auto',
      minWidth: 'auto',
      backgroundColor: 'rgba(255,255,255,.1)',
      color: 'white',
      zIndex: '5',
    })
  },

  navStyle: function () {
    return ({
      zIndex: '999999999999999',
    })
  },

  clickEvent: function () {
    this.setState({ open: !this.state.open })
  },

  render: function () {
    if (!this.props.collection) {

    } else {
      return (
        <div id='CollectionLeftNav' style={{ margin:'0', marginLeft: '16px' }}>
          <FlatButton
            onClick={this.clickEvent}
            style={this.buttonStyle()}
            disableTouchRipple
          >
            <FontIcon className='material-icons' style={CurrentTheme.lightIconStyle()}>menu</FontIcon>
          </FlatButton>

          <Drawer
            docked={false}
            onRequestChange={(open) => this.setState({ open })}
            open={this.state.open}
            id='leftNav'
            className='leftNav'
            children={this.dropDownOptions()}
            style={this.navStyle()} />
        </div>
      )
    }
  },
})

module.exports = CollectionLeftNav
