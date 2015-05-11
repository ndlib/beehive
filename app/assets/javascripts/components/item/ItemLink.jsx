//app/assets/javascripts/components/ItemLink.jsx
var React = require('react');

var ItemLink = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Item Link',

  propTypes: {
    item: React.PropTypes.object.isRequired,
    thumbnailType: React.PropTypes.string,
    showDescription: React.PropTypes.bool,
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
    var descriptionText = "";
    if(this.props.showDescription) {
      descriptionText = (<DescriptionTeaser description={item.description} />);
    }
    return (
      <div className="item">
        <a href={this.targetID()} data-toggle="modal" data-target={this.targetID()} style={this.linkStyle()} className={this.props.className} onClick={this.onClick}>
          <Thumbnail image={item.image} thumbnailType={ this.props.thumbnailType === 'undefined' ? "medium" : this.props.thumbnailType} />
        </a>
        <div className="item-details">
          <a className={this.props.className} href={this.itemUrl(item)}>
            <div className="item-title">{item.name}</div>
          </a>
          {descriptionText}
        </div>

      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ItemLink;
