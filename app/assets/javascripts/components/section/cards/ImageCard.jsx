var React = require('react');
var mui = require('material-ui');
var CardCaption = require("./CardCaption");

var ImageCard = React.createClass({

  propTypes: {
    section: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      position:'relative'
    };
  },

  render: function() {
    return (
      <div style={this.style()}>
        <mui.CardMedia className="img">
          <img style={{width: 'auto' }} src={this.props.section.item.image['thumbnail/medium'].contentUrl} />
        </mui.CardMedia>
        <CardCaption caption={this.props.section.caption} />
      </div>
    );
  },
});

// each file will export exactly one component
module.exports = ImageCard;
