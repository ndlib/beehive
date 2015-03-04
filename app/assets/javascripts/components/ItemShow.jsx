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
          <div className="row">
            <div className="col-md-4">
              <Details item={this.props.item} />
            </div>
            <div className="col-md-8">
              <OpenseadragonViewer image={this.props.item.image} containerID={this.props.item.id} height="600" />
            </div>

          </div>
        </div>
      );
    } else {
      return <Loading />;
    }

  }

});

// each file will export exactly one component
module.exports = ItemShow;
