var React = require("react");

var ShowcaseEnding = React.createClass({
  displayName: "Showcase Ending",

  propTypes: {
    height: React.PropTypes.number.isRequired,
    showcase: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      display: "inline-block",
      verticalAlign: "top",
      position: "relative",
      marginLeft: "10px",
      marginRight: "10px",
      height: this.props.height + "px",
      cursor: "pointer",
      width: "500px",
    };
  },

  containerStyle: function() {
    return {
      height: this.props.height + "px",
    };
  },

  render: function() {
    return (
      <section className="section" style={this.style()} id="section-ending">
        <div className="section-container section-container-text" style={this.containerStyle()}>
          <div className="row row-fluid">
            <h2 className="section-ending-title">Continue to</h2>
            <ShowcaseCard showcase={this.props.showcase}/>
          </div>
        </div>
      </section>
    );
  }

});

module.exports = ShowcaseEnding;
