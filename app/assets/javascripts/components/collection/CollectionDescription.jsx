var React = require('react');

var CollectionDescription = React.createClass({
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
        <p className="collection-description" dangerouslySetInnerHTML={{__html: this.props.collection.description}} />
      </div>
    )
  }
});

module.exports = CollectionDescription;
