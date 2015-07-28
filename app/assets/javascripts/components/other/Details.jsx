//app/assets/javascripts/components/Details.jsx
var React = require('react');

var Details = React.createClass({

  propTypes: {
    item: React.PropTypes.object,
    additionalDetails: React.PropTypes.string,
  },

  render: function () {
    return (
      <div className="well item-details">
        <div className="additional-details" dangerouslySetInnerHTML={{__html: this.props.additionalDetails}} />
        <MetadataList metadata={this.props.item.metadata} />

      </div>
    );
  }
});

module.exports = Details;
