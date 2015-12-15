//app/assets/javascripts/components/collection/CollectionIntroCard.jsx
var React = require("react");
var mui = require('material-ui');

var CollectionIntroCard = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      position: "relative",
      cursor: "pointer",
      height: "400px",
    };
  },
  imageSize: function() {
    return {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        margin: 'auto',
        minWidth:'50%',
        minHeight: '50%',
        maxWidth: 'initial',
        maxHeight:'initial',
        display: 'none',
    };
  },

  onClick: function(e) {
    e.preventDefault();
    window.location = this.introUrl(this.props.collection);
  },

  mockShowcase: function() {
    return {
      name_line_1: "Introduction",
    }
  },

  render: function() {
    return (
      <mui.Card onClick={this.onClick} style={this.style()} >
        <mui.CardMedia
          mediaStyle={{
            background:"url(/images/intro.jpg)",
            height:'100%',
            width:'100%',
            backgroundSize:'cover',
            backgroundPosition:'center top',
          }}
          style={{height: '400px', overflow:'hidden'}}
          overlay={<mui.CardTitle title='Introduction'
          rootStyle={{height:'600px'}}/>}
          >
          <img src='url(/images/intro.jpg)'  style={this.imageSize()} />
        </mui.CardMedia>
      </mui.Card>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionIntroCard;
