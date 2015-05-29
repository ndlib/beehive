//app/assets/javascripts/components/ShowcaseCard.jsx
var React = require("react");

var ShowcaseCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    showDescription: React.PropTypes.bool,
    topChildren: React.PropTypes.any,
  },

  getDefaultProps: function () {
    return {
      showDescription: false,
    };
  },

  style: function() {
    return {
      position: "relative",
      cursor: "pointer",
    };
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.showcaseUrl(this.props.showcase);
  },

  description: function() {
    if (this.props.showDescription) {
      return (
        <div className="bee-card-content-supporting">
          <p>{this.props.showcase.description}</p>
        </div>
      );
    }
  },

  render: function() {
    return (
      <Card backgroundImage={this.props.showcase.image}>
        <div className="showcase-card sixteen-nine" style={this.style()} onClick={this.onClick}>
          <CardOverlay>
            <ShowcaseTitle showcase={this.props.showcase} />
          </CardOverlay>
        </div>
        <div className="bee-card-content">
          <div className="bee-card-content-title" style={{display: "none"}}>
            <h2 className="bee-card-content-title-primary overflow-ellipsis">{this.props.showcase.name_line_1}</h2>
            <h3 className="bee-card-content-title-subtitle overflow-ellipsis">{this.props.showcase.name_line_2}</h3>
          </div>
          {this.description()}
          {this.props.children}
        </div>
      </Card>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseCard;
