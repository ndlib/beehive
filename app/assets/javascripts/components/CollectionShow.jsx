//app/assets/javascripts/components/CollectionShow.jsx
var React = require('react');

var CollectionShow = React.createClass({
  displayName: 'Collection Show',

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius:'10px',
    };
  },

  render: function() {
    if (this.props.collection) {
      return (
        <div className="jumbotron" style={this.style()}>
          <div className="container collection-show">
            <div className="collection-text">
              <h1>{this.props.collection.title}</h1>
              <p dangerouslySetInnerHTML={{__html: this.props.collection.description}} />
            </div>
            <div className="collection-image">
              <Thumbnail image={this.props.collection.image} thumbnailType="medium" />
            </div>

          </div><div className="clear">&nbsp;</div>
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }
  }
});

// each file will export exactly one component
module.exports = CollectionShow;
