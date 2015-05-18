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
    var url;
    if(this.props.collection.showcases){
      if(this.props.collection.showcases.length > 0) {
        url = this.showcaseUrl(this.props.collection.showcases[0]);
      }
    }
    return (
      <div className="row">
        <div className="col-md-12 bee-browse-exhibit" >
          <h2><a href={url}> Browse Exhibit <i className="mdi-navigation-arrow-forward"></i> </a> </h2>
        </div>
      </div>
    );
  }
});

module.exports = CollectionIntroLink;
