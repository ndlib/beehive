import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import MediaQuery from 'react-responsive'

const ShowcaseTitleCard = createReactClass({
  propTypes: {
    showcase: PropTypes.object.isRequired,
    height: PropTypes.number,
  },

  outerStyle: function () {
    const style = {
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      padding: '5px',
      textAlign: 'center',
      overflow: 'hidden',
      width: '85vw',
      boxShadow: 'none',
      backgroundColor: 'rgba(0,0,0,0)',
    }

    if (this.props.height) {
      style.height = this.props.height + 'px'
    }

    return style
  },

  headerStyle: function () {
    let marginTop
    if (this.props.height) {
      marginTop = Math.round(this.props.height * 0.15) + 'px'
    }
    return {
      marginTop: marginTop,
      textShadow: '2px 2px 3px #333333',
      textTransform: 'uppercase',
      color: '#fff',
      backgroundColor: 'rgba(0,0,0,0.1)',
      whiteSpace:'normal',
      lineHeight:'2em !important',
    }
  },

  titleStyle: function () {
    return {
      color: '#fff',
      fontSize: '4vw',
      paddingBottom: '10px',
      lineHeight:'4.1vw',
    }
  },

  subtitleStyle: function () {
    return {
      color: '#fff',
      fontSize: '3vw',
      lineHeight:'3.1vw',
    }
  },

  textStyle: function () {
    return {
      color: '#fff',
      textShadow: '1px 1px 2px #333333',
      fontSize: '18px',
      backgroundColor: 'rgba(0,0,0,0.1)',
      whiteSpace: 'normal',
    }
  },

  names: function () {
    const names = []
    names.push(
      <h2 className='showcase-name-1' key={1}>{this.props.showcase.name_line_1}</h2>,
    )
    if (this.props.showcase.name_line_2) {
      names.push(
        <br key='br' />,
      )
      names.push(
        <h3 className='showcase-name-2' key={2}>{this.props.showcase.name_line_2}</h3>,
      )
    }
    return names
  },

  editTitle: function () {
    window.location = this.props.showcase.editUrl
  },

  render: function () {
    let description
    if (this.props.showcase.description) {
      description = this.props.showcase.description.toString()
    }

    return (
      <Card style={this.outerStyle()}>
        <CardHeader
          title={this.props.showcase.name_line_1}
          subtitle={this.props.showcase.name_line_2}
          style={this.headerStyle()}
          titleStyle={this.titleStyle()}
          subtitleStyle={this.subtitleStyle()}
        />
        <MediaQuery minWidth={650}>
          <CardContent style={this.textStyle()}>
            {description}
          </CardContent>
        </MediaQuery>
      </Card>
    )
  },
})

export default ShowcaseTitleCard
