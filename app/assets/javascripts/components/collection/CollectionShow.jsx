//app/assets/javascripts/components/CollectionShow.jsx
var React = require('react');
var mui = require('material-ui');

var CollectionShow = React.createClass({
  mixins: [CollectionUrlMixin, MuiThemeMixin],

  displayName: 'Collection Show',

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  collectionLoaded: function () {
    if (this.props.collection.name) {
      return true;
    } else {
      return false;
    }
  },

  image: function () {
    return this.props.collection.image["thumbnail/medium"].contentUrl;
  },

  viewExhibitUrl: function() {
    var url = this.introUrl(this.props.collection)

    if (!url) {
      url = this.firstShowcaseUrl(this.props.collection.showcase);
    }

    return url;
  },

  firstExhibitLink: function() {
    var containerStyle = {};
    if (this.viewExhibitUrl()) {
      if(this.props.collection.image) {
        containerStyle = {
          bottom: "25%",
          position: "absolute",
          textAlign: "center",
          width: "100%",
        }
      }
      return (
        <mui.FloatingActionButton
          primary={true} linkButton={true}
          href={this.viewExhibitUrl()}>
            <mui.FontIcon className="material-icons">arrow_forward</mui.FontIcon>
        </mui.FloatingActionButton>

      );
    }
  },

  cardMediaSection: function() {
    if (this.props.collection.image) {
      return (
        <mui.CardMedia overlay={<mui.CardTitle title={this.props.collection.name_line_1} subtitle={this.props.collection.name_line_2} />}>
          <img src={this.image()} />
        </mui.CardMedia>
      );
    } else {
      return (
        <mui.CardTitle title={this.props.collection.name_line_1} subtitle={this.props.collection.name_line_2} />
      );
    }
  },

  render: function() {
    if (this.collectionLoaded()) {
      return (
        <mui.Card>
          {this.cardMediaSection()}
          <mui.CardActions>
            {this.firstExhibitLink()}
          </mui.CardActions>
        </mui.Card>
      );
    } else {
      return <Loading />;
    }
  }
});

// each file will export exactly one component
module.exports = CollectionShow;
