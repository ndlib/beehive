var React = require('react');

var PagesShow = require('../Pages/PagesShow.jsx');

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
        <PagesShow content={this.props.collection.short_description } />
      );
    }
  }
});

module.exports = CollectionIntro;