'use strict'
var React = require("react");
var mui = require('material-ui');

const CollectionUrl = require('../../modules/CollectionUrl.jsx')

var CollectionIntroCard = React.createClass({
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
      <a href={CollectionUrl.introUrl(this.props.collection)}>
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
