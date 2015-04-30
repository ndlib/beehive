var React = require('react');

var CollectionIntro = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
    height: React.PropTypes.string,
    id: React.PropTypes.string,
  },

  style: function() {
    if(this.props.height) {
      return {
        maxHeight: this.props.height + 'px',
        overflow: 'hidden',
      };
    } else {
      return {};
    }
  },

  componentDidMount: function() {},

  render: function() {
    return (
      <div style={this.style()} id={this.props.id}>
        <div className="collection-intro" dangerouslySetInnerHTML={{__html: this.props.collection.short_description}} />
      </div>
    )
  }
});

module.exports = CollectionIntro;
