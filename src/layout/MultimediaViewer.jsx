'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MultimediaViewer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var url = this.props.url;
    if(this.props.autostart) {
      url += '&autostart=' + this.props.autostart;
    }
    return (
      <iframe
        src={ url }
        style={{
          width: this.props.width,
          height: this.props.height,
          overflow: 'hidden',
          border: 'none',
        }}
      >Your browser does not support iFrames.</iframe>
    );
  }
}

MultimediaViewer.propTypes = {
  url: PropTypes.string.isRequired,
  autostart: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
}

MultimediaViewer.defaultProps = {
  url: 'http://localhost:3023/?id=431c7ee5-7215-4cf8-9121-47682b16aed4',
  autostart: false,
  width: '100%',
  height: '100%',
}
export default MultimediaViewer;
