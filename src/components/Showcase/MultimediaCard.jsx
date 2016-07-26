'use strict'
import React, { Component, PropTypes } from 'react';
import mui, { CardMedia, CardTitle, CardText } from 'material-ui';
var CardCaption = require("./CardCaption.jsx");

class MultimediaCard extends Component {

  constructor(props) {
    super(props);
  }

  titleStyle() {
    return {
      color: "lightgrey",
    }
  }

  style() {
    return {
      color:'lightgrey',
      paddingTop:'0',
      maxWidth: Math.floor(window.innerWidth *0.9) + 'px',
      textAlign: 'center',
      fontSize: '120px',
      lineHeight: '120px'
    };
  }

  image() {
    if(this.props.section.item.multimedia["@type"] === "AudioObject") {
      return (
        <div style={this.style()} className="text">
          <CardTitle title={ this.props.section.item.multimedia.name } titleStyle={ this.titleStyle() } />
          <CardText>
            <div><i className="material-icons" style={ this.style() }>library_music</i></div>
          </CardText>
        </div>

      )
    } else {
      return (
        <img style={{width: 'auto' }} src={this.props.section.item.multimedia.thumbnailUrl} />
      )
    }

  }
  render() {
    return (
      <div style={this.style()}>
        <mui.CardMedia className="img">
          {this.image()}
        </mui.CardMedia>
        <CardCaption caption={this.props.section.caption} />
      </div>
     );
  }
}

MultimediaCard.propTypes = {
  section: React.PropTypes.object.isRequired,
}

MultimediaCard.defaultProps = {
  section: {},
}

export default MultimediaCard;
