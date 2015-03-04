//app/assets/javascripts/components/ItemShow.jsx
var React = require('react');

var ItemShow = React.createClass({
  displayName: 'Item Show',

  propTypes: {
    item: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      showDetails: false,
    };
  },

  toggleDetails: function() {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  },

  detailsButtonStyle: function() {
    return {
      backgroundColor: this.state.showDetails ? '#ccc' : '#fff',
    };
  },

  detailsStyle: function() {
    return {
      display: this.state.showDetails ? 'block' : 'none',
    };
  },

  render: function() {
    if (this.props.item) {
      return (
        <div>
          <h2>{this.props.item.title}</h2>
          <button className="btn btn-default btn-raised" onClick={this.toggleDetails} style={this.detailsButtonStyle()}>
            <i className={this.state.showDetails ? "mdi-navigation-unfold-less" : "mdi-navigation-unfold-more"}></i>
            Details
          </button>
          <div className="row">
            <div className="col-md-4" style={this.detailsStyle()}>
              <Details item={this.props.item} />
            </div>
            <div className={this.state.showDetails ? "col-md-8" : "col-md-12"} style={{transition: 'initial'}}>
              <OpenseadragonViewer image={this.props.item.image} containerID={this.props.item.id} height={600} />
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
