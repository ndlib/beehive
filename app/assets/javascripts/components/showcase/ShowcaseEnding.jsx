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
    };
  },

  buttonStyle: function() {
    return {
      position: "absolute",
      bottom: "5vw",
      left: "15vw",
      textAlign: "center",
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
            <ShowcaseCard showcase={this.props.showcase}/>
            <div style={this.buttonStyle()}>
            <a href={this.showcaseUrl(this.props.showcase)} className="btn btn-lg btn-success continue"><span>Continue </span><i className="mdi-navigation-chevron-right"></i></a>
            </div>
          </div>
        </div>
      </section>
    );
  }

});

module.exports = ShowcaseEnding;
