var React = require("react");
var mui = require('material-ui');

var ShowcaseEndingCard = React.createClass({
  displayName: "Showcase Ending",
  mixins: [CollectionUrlMixin],

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
    };
  },

  render: function() {
    return (
      <mui.Paper style={this.style()} >
        <ShowcaseCard showcase={this.props.showcase} addNextButton={true} headerTitle="Next Showcase" />
      </mui.Paper>
    );
  }

});

module.exports = ShowcaseEndingCard;
