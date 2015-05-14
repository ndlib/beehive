//app/assets/javascripts/components/modal/CollectionDescriptionModal.jsx
var React = require('react');

var CollectionIntroLink = React.createClass({
  mixins: [CollectionUrlMixin],

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
    var url = this.introUrl(this.props.collection);
    return (
      <div className="row">
        <div className="col-md-12">
          <h1><a href={url}> Browse Exhibit </a> > </h1>
        </div>
      </div>
    );
  }
});

module.exports = CollectionIntroLink;
