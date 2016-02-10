'use strict'
var React = require("react");
var mui = require('material-ui');

var HoneycombImage = require("../other/HoneycombImage.jsx");

var PreviewLink = React.createClass({
  mixins: [
    require("../mixins/CollectionUrlMixin.jsx"),
    require("../mixins/MuiThemeMixin.jsx")
  ],
  propTypes: {
    siteObject: React.PropTypes.object,
  },

  getInitialState: function () {
    return {
      hover: false
    };
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.collectionObjectUrl(this.props.siteObject);
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

  buttonStyle: function() {
    return {
      position: "fixed",
      bottom: "107px",
      right: "40px",
      cursor: "pointer",
      backgroundColor: "#2c5882",
    }
  },


  render: function() {
    var url = this.collectionObjectUrl(this.props.siteObject);
    return (
        <mui.Card style={this.style()} onClick={this.onClick}  onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} >
          <mui.CardMedia overlay={<mui.CardTitle title="Continue" />}>
            <HoneycombImage image={this.props.siteObject.image} size="small" />
          </mui.CardMedia>
          <mui.FloatingActionButton
            linkButton={true}
            href={ url }
            style={this.buttonStyle()}
            zDepth={2}
          >
            <mui.FontIcon style={{ mixBlendMode: "soft-light" }} className="material-icons">arrow_forward</mui.FontIcon>
          </mui.FloatingActionButton>
        </mui.Card>
    );
  }
});

module.exports = PreviewLink;
