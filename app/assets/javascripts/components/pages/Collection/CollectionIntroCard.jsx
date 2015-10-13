//app/assets/javascripts/components/collection/CollectionIntroCard.jsx
var React = require("react");

var CollectionIntroCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      position: "relative",
      cursor: "pointer",
    };
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.introUrl(this.props.collection);
  },

  mockShowcase: function() {
    return {
      name_line_1: "Introduction",
    }
  },

  render: function() {
    return (
      <Card>
        <div className="showcase-card intro-card sixteen-nine" style={this.style()} onClick={this.onClick}>
          <CardOverlay>
            <ShowcaseTitle showcase={this.mockShowcase()} />
          </CardOverlay>
        </div>
      </Card>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionIntroCard;
