'use strict'
var React = require("react");
var mui = require('material-ui');

var CollectionIntroCard = React.createClass({
  mixins: [
    require('../../mixins/CollectionUrlMixin.jsx')
  ],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      position: "relative",
      cursor: "pointer",
      height: "400px",
    };
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.introUrl(this.props.collection);
  },

  render: function() {
    return (
      <mui.Card onClick={this.onClick} style={this.style()} >
        <mui.CardMedia
          className="collection-site-path-card"
          overlay={<mui.CardTitle title='Introduction'/>}
        />
      </mui.Card>
    );
  }
});

module.exports = CollectionIntroCard;
