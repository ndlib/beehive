var React = require('react');

var CollectionIntro = React.createClass({
  mixins: [
    require("../../mixins/MuiThemeMixin.jsx")
  ],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  style: function () {
    return ({
      margin:'60px 0',
    });
  },

  render: function() {
    if(this.props.collection) {
      return (
        <div className="essay-content" style={this.style()} dangerouslySetInnerHTML={{__html:this.props.collection.short_description}} />
      );
    }
  }
});

module.exports = CollectionIntro;
