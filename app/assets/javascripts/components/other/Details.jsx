//app/assets/javascripts/components/Details.jsx
var React = require('react');

var Details = React.createClass({

  propTypes: {
    item: React.PropTypes.object
  },

  render: function () {
    return (
      <div className="well item-details">
        <MetadataList metadata={this.props.item.metadata} />

      </div>
    );
  }
});

module.exports = Details;
