//app/assets/javascripts/components/collection/CollectionCard.jsx
var React = require('react');
var mui = require('material-ui');

var CollectionCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.collectionUrl(this.props.collection);
  },

  render: function() {
    return (
      <mui.Card onClick={this.onClick}>
        <mui.CardMedia overlay={
          <mui.CardTitle
            title={this.props.collection.name_line_1}
            subtitle={this.props.collection.name_line_2}
          />
          }
        >
          <img src={this.props.collection.image.contentUrl}/>
        </mui.CardMedia>
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionCard;
