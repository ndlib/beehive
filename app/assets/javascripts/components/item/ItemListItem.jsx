//app/assets/javascripts/components/ItemLink.jsx
var React = require('react');

var ItemLink = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Item Link',

  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  onClick: function() {
    window.location.hash = "modal-" + this.props.item.id;
  },

  linkStyle: function() {
    return {
      display: 'block',
      height: '100%',
      color: 'inherit',
    };
  },

  targetID: function() {
    return "#modal-" + this.props.item.id;
  },

  render: function() {
    var item = this.props.item;
    return (
      <div key={this.props.item['@id']} className="item">
        <a href={this.targetID()} data-toggle="modal" data-target={this.targetID()} style={this.linkStyle()} className={this.props.className} onClick={this.onClick}>
          <Thumbnail image={item.image} thumbnailType="small" />
          <div className="item-details">
            <div className="item-title">{item.name}</div>
            <DescriptionTeaser description={item.description} />
          </div>
        </a>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ItemLink;
