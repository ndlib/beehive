//app/assets/javascripts/components/collection/CollectionCard.jsx
var React = require('react');

var CollectionCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    imageHeight: React.PropTypes.number,
    contentHeight: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      imageHeight: 200,
      contentHeight: 150,
    };
  },

  imageContainerStyle: function() {
    return {
      position: "relative",
      height: this.props.imageHeight + "px",
      cursor: 'pointer',
    };
  },

  style: function() {
    return {
      position: "relative",
      height: this.props.imageHeight + "px",
    };
  },

  supportingStyle: function() {
    return {
      display: 'none',
    };
  },

  onClick: function(e) {
    e.preventDefault();
    window.open(this.collectionUrl(this.props.collection), '_blank');
  },

  render: function() {
    return (
      <Card>
        <div className="bee-card-image" style={this.imageContainerStyle()} onClick={this.onClick}>
          <CardBackground image={this.props.collection.image} />
          <div className="collection-card" style={this.style()}>
            <CardOverlay />
          </div>
        </div>
        <div className="bee-card-content">
          <div className="bee-card-content-title">
            <h2 className="bee-card-content-title-primary overflow-ellipsis">{this.props.collection.name_line_1}</h2>
            <h3 className="bee-card-content-title-subtitle overflow-ellipsis">{this.props.collection.name_line_2}</h3>
          </div>
          <div className="bee-card-content-actions">
            <a href={this.collectionUrl(this.props.collection)} target="_blank" className="btn btn-default">Explore</a>
          </div>
          <div className="bee-card-content-supporting" style={this.supportingStyle()}>
            <div dangerouslySetInnerHTML={{__html: this.props.collection.short_description}} />
          </div>
        </div>
      </Card>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionCard;
