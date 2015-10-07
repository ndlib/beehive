//app/assets/javascripts/components/ShowcaseCard.jsx
var React = require("react");
var mui = require('material-ui');

var ShowcaseCard = React.createClass({
  mixins: [CollectionUrlMixin, MuiThemeMixin],

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.showcaseUrl(this.props.showcase);
  },

  description: function() {
    if (this.props.showcase.description) {
      return (
        <mui.CardText>
          {this.props.showcase.description}
        </mui.CardText>
      );
    }
  },

  render: function() {
    return (
      <mui.Card>
        <mui.CardMedia overlay={<mui.CardTitle title={this.props.showcase.name_line_1} subtitle={this.props.showcase.name_line_2} />}>
          <img src={this.props.showcase.image.contentUrl} />
        </mui.CardMedia>
        {this.description()}
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseCard;
