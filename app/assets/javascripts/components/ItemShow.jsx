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
    console.log(this.state.item);
    if (this.state.item) {
      return (
        <div>
          <h2>{this.state.item.title}</h2>

          <div className="description" dangerouslySetInnerHTML={{__html: this.state.item.description}} />
          <OpenseadragonViewer image={this.state.item.image} containerID={this.state.item.id} />
          <MetadataList metadata={this.state.item.metadata} />
          <div>
            <dl>
              <dt>API Link</dt>
              <dd>{this.props.itemsUrl}</dd>
            </dl>
            <dl>
              <dt>Unique ID</dt>
              <dd>{this.state.item.id}</dd>
            </dl>
            <dl>
              <dt>Title Slug</dt>
              <dd>{this.state.item.slug}</dd>
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
