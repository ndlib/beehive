'use strict'
var React = require("react");
var mui = require('material-ui');

var PreviewLink = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    showcase: React.PropTypes.object,
  },

  getInitialState: function () {
    return {
      hover: false
    };
  },

  mouseOver: function () {
    this.setState({hover: true});
  },

  mouseOut: function () {
    this.setState({hover: false});
  },

  style: function() {
    return {
      position: "fixed",
      bottom: "60px",
      right: "40px",
      cursor: "pointer",
      color: "#f5f5f5",
      opacity: this.state.hover ? "1.0" : "0.3",
      maxWidth: "200px",
    }
  },

  render: function() {
    return (
      <a href={this.showcaseUrl(this.props.showcase)} style={this.style()} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} >
        <mui.Card>
          <mui.CardMedia overlay={<mui.CardTitle title="Start Showcases"/>}>
            <HoneycombImage image={this.props.showcase.image} size="small" />
          </mui.CardMedia>
        </mui.Card>
      </a>
    );
  }
});

module.exports = PreviewLink;
