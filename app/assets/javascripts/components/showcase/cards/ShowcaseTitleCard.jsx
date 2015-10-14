//app/assets/javascripts/components/ShowcaseTitle.jsx
var React = require("react");
var mui = require('material-ui');

var converter = new Showdown.converter()

var ShowcaseTitleCard = React.createClass({
  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    height: React.PropTypes.number,
  },

  outerStyle: function() {
    var style = {
      display: "inline-block",
      verticalAlign: "top",
      position: "relative",
      padding: "5px",
      textAlign: "center",
      overflow: 'hidden',
      width: '85vw',
    };

    if (this.props.height) {
      style['height'] = this.props.height + "px";
    }

    return style;
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
      <mui.Card style={this.outerStyle()}>
        <mui.CardTitle title={this.props.showcase.name_line_1} subtitle={this.props.showcase.name_line_2}  style={this.headerStyle()} />
        <mui.CardText>
          {description}
        </mui.CardText>
      </mui.Card>
    )
    return (
      <div className="showcase-title-page" style={this.outerStyle()}>
        <div className="showcase-title-page-inner">
          <div className="showcase-title-container" style={this.headerStyle()}>
            {this.names()}
          </div>
          <br />
          <div className="showcase-title-description-container">
            <div className="showcase-title-description">{description}</div>
          </div>
          <div className="showcase-controlls">
            <img src="/images/touch.svg" className="touch" alt="Swipe Left or Right" title="Swipe Left or Right" />
            <img src="/images/scroll.svg" className="scroll" alt="Scroll with the Mouse Wheel" title="Scroll with the Mouse Wheel" />
          </div>
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseTitleCard;
