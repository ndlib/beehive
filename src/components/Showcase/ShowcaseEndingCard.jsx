var React = require("react");
var mui = require('material-ui');

var ShowcaseCard = require('../Collection/ShowcaseCard.jsx');

var ShowcaseEndingCard = React.createClass({
  displayName: "Showcase Ending",
  mixins: [
    require('../../mixins/CollectionUrlMixin.jsx'),
    require('../../mixins/CurrentThemeMixin.jsx')
  ],

  propTypes: {
    height: React.PropTypes.number.isRequired,
    showcase: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      display: "inline-block",
      verticalAlign: "middle",
      position: "relative",
      marginLeft: "150px",
      marginRight: "33vw",
      height: "auto",
      cursor: "pointer",
      width: "500px",
      overflow: "hidden",
      backgroundColor: this.getCurrentPallette().showcaseTextCardColor,
    };
  },

  render: function() {
    return (
      <mui.Paper style={this.style()} >
        <ShowcaseCard showcase={this.props.showcase} addNextButton={true} headerTitle="Next Showcase" fixedSize={false}/>
      </mui.Paper>
    );
  }

});

module.exports = ShowcaseEndingCard;
