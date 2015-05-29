//app/assets/javascripts/components/ShowcaseTitle.jsx
var React = require("react");

var converter = new Showdown.converter()

var ShowcaseTitle = React.createClass({
  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    height: React.PropTypes.number,
  },

  outerStyle: function() {
    var height;
    if (this.props.height) {
      height = this.props.height + "px";
    }
    return {
      display: "inline-block",
      verticalAlign: "top",
      position: "relative",
      padding: "5px",
      height: height,
      textAlign: "center",
    };
  },

  headerStyle: function() {
    var marginTop;
    if (this.props.height) {
      var marginTop = Math.round(this.props.height * 0.15) + "px";
    }
    return {
      marginTop: marginTop,
    }
  },

  names: function() {
    var names = [];
    names.push(
      <h2 className="showcase-name-1" key={1}>{this.props.showcase.name_line_1}</h2>
    );
    if (this.props.showcase.name_line_2) {
      names.push(
        <br key="br" />
      );
      names.push(
        <h3 className="showcase-name-2" key={2}>{this.props.showcase.name_line_2}</h3>
      );
    }
    return names;
  },

  editTitle: function() {
    window.location = this.props.showcase.editUrl;
  },

  render: function() {
    var description;
    if (this.props.showcase.description) {
      description = this.props.showcase.description.toString();
    }

    return (
      <div className="showcase-title-page" style={this.outerStyle()}>
        <div className="showcase-title-page-inner">
          <div className="showcase-title-container" style={this.headerStyle()}>
            {this.names()}
          </div>
          <br />
          <div className="showcase-title-description-container">
            <div className="showcase-title-description" dangerouslySetInnerHTML={{__html: description}}  />
          </div>
          <div className="showcase-controlls">
            <img src="/images/touch.svg" className="touch" alt="Swipe Left or Right" />
            <img src="/images/scroll.svg" className="scroll" alt="Scroll the Mouse Wheel" />
          </div>
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseTitle;
