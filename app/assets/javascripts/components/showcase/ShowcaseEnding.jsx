var React = require("react");

var ShowcaseEnding = React.createClass({
  displayName: "Showcase Ending",
  mixins: [CollectionUrlMixin],

  propTypes: {
    height: React.PropTypes.number.isRequired,
    showcase: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      display: "inline-block",
      verticalAlign: "top",
      position: "relative",
      marginLeft: "150px",
      marginRight: "33vw",
      height: this.props.height + "px",
      cursor: "pointer",
      width: "500px",
      overflow: "hidden",
    };
  },

  buttonStyle: function() {
    return {
      position: "absolute",
      top: "27rem",
      left: "0",
      right: "0",
      textAlign: "center",
      margin: "0 auto",
      zIndex: "1",
    };
  },

  containerStyle: function() {
    return {
      height: this.props.height + "px",
    };
  },

  render: function() {
    return (
      <section className="section section-continue" style={this.style()} id="section-ending">
        <div className="section-container section-container-text" style={this.containerStyle()}>
          <div className="row row-fluid">
            <h2 className="section-ending-title">Next Showcase</h2>
            <div style={this.buttonStyle()}>
              <a href={this.showcaseUrl(this.props.showcase)} className="btn btn-lg btn-success continue"><span>Continue </span><i className="mdi-navigation-chevron-right"></i></a>
            </div>
            <ShowcaseCard showcase={this.props.showcase} />

          </div>
        </div>
      </section>
    );
  }

});

module.exports = ShowcaseEnding;
