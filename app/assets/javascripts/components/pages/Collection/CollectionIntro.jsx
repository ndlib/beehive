var React = require('react');

var CollectionIntro = React.createClass({
  mixins: [MuiThemeMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  style: function () {
    return ({
      margin:'60px 0',
    });
  },

  render: function() {
    return (
      <div className="collection-introduction" style={this.style()} dangerouslySetInnerHTML={{__html: this.props.collection.short_description}} />
    );
  }
});

module.exports = CollectionIntro;
