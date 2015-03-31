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
        <a href="#" data-toggle="modal" data-target={this.targetID()} style={this.linkStyle()} className={this.props.className}>
          <Thumbnail image={item.image} thumbnailType={ this.props.thumbnailType === 'undefined' ? "medium" : this.props.thumbnailType} />
        </a>
        <div className="item-details">
          <a className={this.props.className} href={this.itemUrl(item)}>
            <div className="item-title">{item.title}</div>
          </a>
          {descriptionText}
        </div>

      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ItemLink;
