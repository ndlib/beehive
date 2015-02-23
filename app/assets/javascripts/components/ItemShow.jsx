//app/assets/javascripts/components/ItemShow.jsx
var React = require('react');

var ItemShow = React.createClass({
  displayName: 'Item Show',
  propTypes: {
    itemsUrl: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      item: null,
    };
  },
  componentDidMount: function() {
    $.get(this.props.itemsUrl, function(result) {
      this.setState({
        item: result,
      })
    }.bind(this));
  },

  render: function() {
    console.log(this.state);
    if (this.state.item) {
      return (
        <div>
          <h2>Item</h2>
          <div>{this.state.item.id}</div>
          <div>{this.state.item.slug}</div>
          <div>{this.state.item.title}</div>
          <div dangerouslySetInnerHTML={{__html: this.state.item.description}} />
          <Thumbnail image={this.state.item.image} thumbnailType="small" />
          <div>{this.props.itemsUrl}</div>
          <MetadataList metadata={this.state.item.metadata} />
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }

  }

});

// each file will export exactly one component
module.exports = ItemShow;
