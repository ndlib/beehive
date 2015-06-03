var React = require("react");

var ItemLink = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: "Item Link",

  propTypes: {
    item: React.PropTypes.object.isRequired,
    className: React.PropTypes.string.isRequired,
  },

  onClick: function() {
    window.location.hash = "modal-" + this.props.item.id;
  },

  imageStyle: function() {
    return {
      paddingTop: "100%",
      position: "relative"
    };
  },

  holderStyle: function() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "absolute",
    };
  },

  backgroundStyle: function() {
    if (this.props.item.image) {
      var backgroundImage;
      backgroundImage = "url(\"" + this.props.item.image["thumbnail/medium"].contentUrl + "\")";
      return {
        width: "100%",
        height: "100%",
        position: "absolute",
        background: backgroundImage + " 50% 50% / cover no-repeat",
      };
    } else {
      return {};
    }
  },

  targetID: function() {
    return "#modal-" + this.props.item.id;
  },

  render: function() {
    return (
      <div className={this.props.className}>
        <div key={this.props.item["@id"]} className="bee-item">
          <a href={this.targetID()} data-toggle="modal" data-target={this.targetID()} onClick={this.onClick}>
            <div className="bee-item-image-wrapper">
              <div className="bee-item-image" style={this.imageStyle()}>
                <div className="bee-item-holder" style={this.holderStyle()}>
                  <div className="bee-item-background" style={this.backgroundStyle()} />
                </div>
              </div>
            </div>
            <div className="bee-item-text">
              <h2>{this.props.item.name}</h2>
              <div className="bee-item-description" dangerouslySetInnerHTML={{__html: this.props.item.description}}/>
            </div>
          </a>
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ItemLink;
