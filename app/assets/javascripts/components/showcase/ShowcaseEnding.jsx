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
      verticalAlign: "middle",
      position: "relative",
      marginLeft: "150px",
      marginRight: "33vw",
      height: "auto",
      cursor: "pointer",
      width: "500px",
      overflow: "hidden",
    };
  },

  buttonStyle: function() {
    return {
      position: "absolute",
      bottom: "1em",
      left: "0",
      right: "0",
      textAlign: "center",
      margin: "0 auto",
      zIndex: "1",
    };
  },

  containerStyle: function() {
    return {
      height: "auto",
    };
  },

  continueButton: function() {
    return (
      <div style={this.buttonStyle()}>
        <a href={this.showcaseUrl(this.props.showcase)} className="btn btn-lg btn-success continue"><span>Continue </span><i className="mdi-navigation-chevron-right"></i></a>
      </div>
    );
  },

  render: function() {
    return (
      <section className="section section-continue" style={this.style()} id="section-ending">
        <div className="section-container section-container-text" style={this.containerStyle()}>
          <h2 className="section-container-text-title section-ending-title">Next Showcase</h2>
          <ShowcaseCard showcase={this.props.showcase}>
            {this.continueButton()}
          </ShowcaseCard>
        </div>
      </section>
    );
  }

});

module.exports = ShowcaseEnding;
