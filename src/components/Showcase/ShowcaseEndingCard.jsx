var React = require("react");
var mui = require('material-ui');

var SitePathCard = require('../Collection/SitePathCard.jsx');
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var ShowcaseEndingCard = React.createClass({
  displayName: "Showcase Ending",
  propTypes: {
    height: React.PropTypes.number.isRequired,
    siteObject: React.PropTypes.object.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
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
      marginTop: "12vh",
      backgroundColor: CurrentTheme.getCurrentPallette(this.context.muiTheme).showcaseTextCardColor,
    };
  },

  render: function() {
    return (
      <mui.Paper style={this.style()} >
        <SitePathCard siteObject={this.props.siteObject} addNextButton={true} headerTitle="Continue to" fixedSize={false}/>
      </mui.Paper>
    );
  }

});

module.exports = ShowcaseEndingCard;
