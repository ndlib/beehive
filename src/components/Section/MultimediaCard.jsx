
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import mui, { CardMedia, CardTitle, CardText } from 'material-ui';
import CardCaption from "./CardCaption.jsx";

var style = {
  title: function() {
    return {
      color: "lightgrey",
    }
  },

  text: function() {
    return {
      color:'lightgrey',
      paddingTop:'0',
      maxWidth: Math.floor(window.innerWidth *0.9) + 'px',
      textAlign: 'center',
      fontSize: '120px',
      lineHeight: '120px'
    };
  }
}

class MultimediaCard extends Component {

  constructor(props) {
    super(props);
  }

  image() {
    if(this.props.section.item.multimedia["@type"] === "AudioObject") {
      return (
        <div style={style.text()} className="text">
          <CardTitle title={ this.props.section.item.multimedia.name } titleStyle={ style.title() } />
          <CardText>
            <div><i className="material-icons" style={ style.text() }>library_music</i></div>
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
      <div style={style.text()}>
        <CardMedia className="img">
          {this.image()}
        </CardMedia>
        <CardCaption caption={this.props.section.caption} />
      </div>
     );
  }
}

MultimediaCard.propTypes = {
  section: PropTypes.object.isRequired,
}

MultimediaCard.defaultProps = {
  section: {},
}

export default MultimediaCard;
