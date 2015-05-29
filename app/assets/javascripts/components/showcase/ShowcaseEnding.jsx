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

  originalHeader: function() {
    return (
      <h2 className="section-container-text-title section-ending-title">Next Showcase</h2>
    );
  },

  originalButton: function() {
    return (
      <div style={this.buttonStyle()}>
        <a href={this.showcaseUrl(this.props.showcase)} className="btn btn-lg btn-success continue"><span>Continue </span><i className="mdi-navigation-chevron-right"></i></a>
      </div>
    );
  },

  topTitle: function() {
    return (
      <div className="bee-card-content">
        <div className="bee-card-content-title">
          <h2 className="bee-card-content-title-primary">Next Showcase</h2>
        </div>
      </div>
    );
  },

  actions: function() {
    return (
      <div className="bee-card-content-actions clearfix">
        <a href={this.showcaseUrl(this.props.showcase)} className="btn btn-success pull-right"><span>Continue </span><i className="mdi-navigation-chevron-right"></i></a>
      </div>
    );
  },

  render: function() {
    return (
      <section className="section section-continue" style={this.style()} id="section-ending">
        <div className="section-container section-container-text" style={this.containerStyle()}>
          {this.originalHeader()}
          <ShowcaseCard showcase={this.props.showcase}>
            {this.originalButton()}
          </ShowcaseCard>
        </div>
      </section>
    );
  }

});

module.exports = ShowcaseEnding;
