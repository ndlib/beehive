//app/assets/javascripts/components/collection/CollectionIntroCard.jsx
var React = require("react");
var mui = require('material-ui');

var CollectionIntroCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      position: "relative",
      cursor: "pointer",
      height: "500px",
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
      <mui.Card onClick={this.onClick} style={this.style()} >
        <mui.CardTitle title="Introduction" />
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionIntroCard;
