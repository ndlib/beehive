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

  image: function() {
    return this.props.showcase.image["thumbnail/medium"].contentUrl;
  },

  description: function() {
    if (this.props.showcase.description) {
      return (
        <mui.CardText style={{height: '100px'}}>
          {this.props.showcase.description}
        </mui.CardText>
      );
    }
  },

  render: function() {
    return (
      <mui.Card onClick={this.onClick} style={{height: '500px'}} >
        <mui.CardMedia style={{height: '400px'}} overlay={<mui.CardTitle title={this.props.showcase.name_line_1} subtitle={this.props.showcase.name_line_2} />}>
          <img src={this.image()}  style={{ height: '400px', overflow: 'hidden'}} />
        </mui.CardMedia>
        {this.description()}
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseCard;
