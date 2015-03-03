//app/assets/javascripts/components/ItemShow.jsx
var React = require('react');

var ItemShow = React.createClass({
  displayName: 'Item Show',
  propTypes: {
    item: React.PropTypes.object,
  },

  render: function() {
    if (this.props.item) {
      return (
        <div>
          <h2>{this.props.item.title}</h2>

          <div className="description" dangerouslySetInnerHTML={{__html: this.props.item.description}} />
          <OpenseadragonViewer image={this.props.item.image} containerID={this.props.item.id} />
          <MetadataList metadata={this.props.item.metadata} />
          <div>
            <dl>
              <dt>API Link</dt>
              <dd>{this.props.itemsUrl}</dd>
            </dl>
            <dl>
              <dt>Unique ID</dt>
              <dd>{this.props.item.id}</dd>
            </dl>
            <dl>
              <dt>Title Slug</dt>
              <dd>{this.props.item.slug}</dd>
            </dl>
          </div>
          <div>TODO SUBITEMS</div>
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }

  }

});

// each file will export exactly one component
module.exports = ItemShow;
