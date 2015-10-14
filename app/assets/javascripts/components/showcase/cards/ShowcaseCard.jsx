//app/assets/javascripts/components/ShowcaseCard.jsx
var React = require("react");
var mui = require('material-ui');

var ShowcaseCard = React.createClass({
  mixins: [CollectionUrlMixin, MuiThemeMixin],

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    addNextButton: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      addNextButton: false,
      headerTitle: false,
    }
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.showcaseUrl(this.props.showcase);
  },

  style: function() {
    return {
      position: "relative",
      cursor: "pointer",
    };
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

  nextButton: function() {
    if (this.props.addNextButton) {
      return (
        <mui.CardActions style={ {height: '100px'} }>
          <mui.FloatingActionButton
            primary={true}
            linkButton={true}
            href={this.props.showcase['@id']}>
              <mui.FontIcon className="material-icons">arrow_forward</mui.FontIcon>
          </mui.FloatingActionButton>
        </mui.CardActions>
      );
    }
  },

  headerTitle: function () {
    if (this.props.headerTitle) {
      return (<mui.CardTitle title={this.props.headerTitle} />);
    }
  },

  render: function() {
    return (
      <mui.Card onClick={this.onClick} style={this.style()} >
        {this.headerTitle()}
        <mui.CardMedia style={{height: '400px'}} overlay={<mui.CardTitle title={this.props.showcase.name_line_1} subtitle={this.props.showcase.name_line_2} />}>
          <img src={this.image()}  style={{ height: '400px', overflow: 'hidden'}} />
        </mui.CardMedia>
        {this.description()}
        {this.nextButton()}
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseCard;
