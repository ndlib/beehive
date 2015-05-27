var React = require("react");
var Scroll = require('react-scroll');

var Link = Scroll.Link;
var Element = Scroll.Element;

var MoreArrow = React.createClass({
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

  wellStyle: function() {
    return {
      position: "fixed",
      bottom: "60px",
      right: "40px",
      cursor: "pointer",
      color: "#f5f5f5",
      opacity: "0.3",
      maxWidth: "200px",
    }
  },
  wellHoverStyle: function() {
      return {
      position: "fixed",
      bottom: "60px",
      right: "40px",
      cursor: "pointer",
      color: "#f5f5f5",
      opacity: "1.0",
      maxWidth: "200px",
    }
  },

  headerStyle: function() {
    return {
      color: "#555",
      fontSize: "18px",
    }
  },

  imageStyle: function() {
    return {
      overflow: "hidden",
      width: "100%",
      height: "110px",
      borderRadius: "1px",
      boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.75)",
      objectFit: "cover",
    }
  },

  chevronStyle: function() {
    return {
      color: "#555",
      textAlign: "center",
      width: "100%",
    }
  },

  render: function() {
    var divStyle = this.wellStyle();
    if (this.state.hover) {
      divStyle = this.wellHoverStyle();
    }

    return (

        <div className="well" style={divStyle} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} >
        <Link to="startShowcases" spy={true} smooth={true} offset={50} duration={500} >
          <h3 style={this.headerStyle()}>Next Showcase</h3>
        </Link>
        <a href={this.showcaseUrl(this.props.showcase)}>
          <Thumbnail image={this.props.showcase.image} thumbnailType="small" style={this.imageStyle()} />
        </a>
        <Link to="startShowcases" spy={true} smooth={true} offset={50} duration={500} >
          <div style={this.chevronStyle()}><i className="mdi-navigation-expand-more" /></div>
        </Link>
      </div>

    );
  }
});

module.exports = MoreArrow;
