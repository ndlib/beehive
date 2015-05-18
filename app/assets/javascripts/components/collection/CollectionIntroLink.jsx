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
    var firstShowcase = this.firstShowcaseUrl(this.props.collection.showcase);
    if(firstShowcase) {
      return (
        <div className="row">
          <div className="col-md-12 bee-browse-exhibit" >
            <h2><a href={firstShowcase}> Browse Exhibit <i className="mdi-navigation-arrow-forward"></i> </a> </h2>
          </div>
        </div>
      );
    } else {
      return (<div />);
    }
  }
});

module.exports = CollectionIntroLink;
