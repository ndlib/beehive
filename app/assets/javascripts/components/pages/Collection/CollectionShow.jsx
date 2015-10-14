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

  style: function() {

      return ({
        position: 'absolute',
      });

  },

  firstExhibitLink: function() {
    if (this.viewExhibitUrl()) {
      return (
        <mui.FloatingActionButton
          primary={true}
          linkButton={true}
          href={this.viewExhibitUrl()}
          style={this.style()}>
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
        <mui.Paper circle={false} rounded={false} zDepth={0} >
          <mui.Card>
            {this.cardMediaSection()}
            <mui.CardActions>
              {this.firstExhibitLink()}
            </mui.CardActions>
          </mui.Card>
        </mui.Paper>
      );
    } else {
      return <Loading />;
    }
  }
});

// each file will export exactly one component
module.exports = CollectionShow;