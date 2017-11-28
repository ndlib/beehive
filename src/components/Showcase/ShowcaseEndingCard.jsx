import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper } from 'material-ui'

var SitePathCard = require('../Collection/SitePathCard.jsx')
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var ShowcaseEndingCard = createReactClass({
  displayName: "Showcase Ending",
  propTypes: {
    height: PropTypes.number.isRequired,
    siteObject: PropTypes.object.isRequired,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  style: function() {
    return {
      display: "inline-block",
      verticalAlign: "middle",
      position: "relative",
      marginLeft: "150px",
      marginRight: "33vw",
      height: "auto",
      cursor: "pointer",
      width: "500px",
      overflow: "hidden",
      marginTop: "12vh",
      backgroundColor: CurrentTheme.getCurrentPallette(this.context.muiTheme).showcaseTextCardColor,
    }
  },

  render: function() {
    return (
      <Paper style={this.style()} >
        <SitePathCard siteObject={this.props.siteObject} addNextButton={true} headerTitle="Continue to" fixedSize={false}/>
      </Paper>
    )
  }

})

module.exports = ShowcaseEndingCard
