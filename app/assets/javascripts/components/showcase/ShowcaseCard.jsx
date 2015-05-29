//app/assets/javascripts/components/ShowcaseCard.jsx
var React = require("react");

var ShowcaseCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
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

  render: function() {
    if (this.props.showcase.description) {
      description = this.props.showcase.description.toString();
    }
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
          <div className="bee-card-content-supporting">
            <div dangerouslySetInnerHTML={{__html: description}} />
          </div>
        </div>
      </Card>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseCard;
