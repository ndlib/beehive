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

  render: function() {
    return (
      <a href={this.introUrl(this.props.collection)}>
        <mui.Card style={this.style()} >
          <mui.CardMedia
            className="collection-site-path-card"
            overlay={<mui.CardTitle title='Introduction'/>}
          />
        </mui.Card>
      </a>
    );
  }
});

module.exports = CollectionIntroCard;
