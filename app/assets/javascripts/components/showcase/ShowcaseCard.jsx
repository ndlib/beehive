//app/assets/javascripts/components/ShowcaseCard.jsx
var React = require('react');

var ShowcaseCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    height: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      height: 300,
    };
  },

  style: function() {
    return {
      position: "relative",
      height: this.props.height + "px",
      cursor: 'pointer',
    };
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.showcaseUrl(this.props.showcase);
  },

  render: function() {
    return (
      <Card backgroundImage={this.props.showcase.image}>
        <div className="showcase-card" style={this.style()} onClick={this.onClick}>
          <CardOverlay>
            <ShowcaseTitle showcase={this.props.showcase} width="100%" />
          </CardOverlay>
        </div>
      </Card>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseCard;
