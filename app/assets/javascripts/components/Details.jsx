//app/assets/javascripts/components/Details.jsx
var React = require('react');

var Details = React.createClass({

  propTypes: {
    item: React.PropTypes.object
  },

  render: function () {
    return (
      <div className="item-details">
        <div className="description" dangerouslySetInnerHTML={{__html: this.props.item.description}} />
        <MetadataList metadata={this.props.item.metadata} />
        <dl>
          <dt>Unique ID</dt>
          <dd>{this.props.item.id}</dd>
        </dl>
        <dl>
          <dt>Title Slug</dt>
          <dd>{this.props.item.slug}</dd>
        </dl>
      </div>
    );
  }
});

module.exports = Details;
