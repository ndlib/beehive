//app/assets/javascripts/components/modal/CollectionDescriptionModal.jsx
var React = require('react');

var CollectionDescriptionModal = React.createClass({
  displayName: 'Item Modal',
  propTypes: {
    collection: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  content: function() {
    return (
      <div style={this.styles()}>
         <CollectionDescription collection={this.props.collection} />
       </div>
    );
  },

   styles: function() {
    if (this.props.height) {
      return {
        height: this.props.height + 'px',
        overflowY: 'scroll',
      };
    } else {
      return {};
    }
  },

  render: function () {
    var content = this.content();
    return (
      <Modal height={this.props.height} id="modal-collection-description" content={content} />
    );
  }
});

module.exports = CollectionDescriptionModal;
