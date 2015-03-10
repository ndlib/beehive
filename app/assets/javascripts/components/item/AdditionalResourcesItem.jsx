//app/assets/javascripts/components/AdditionalResourcesItem.jsx
var React = require('react');

var AdditionalResourcesItem = React.createClass({

  propTypes: {
    item: React.PropTypes.object,
  },

  render: function () {
    return (
      <div className="additional-resource">
        <ItemLink item={this.props.item} thumbnailType="small" />
      </div>
    );
  }
});

module.exports = AdditionalResourcesItem;
