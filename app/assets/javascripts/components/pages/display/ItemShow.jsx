//app/assets/javascripts/components/ItemShow.jsx
var React = require("react");

var ItemShow = React.createClass({
  displayName: "Item Show",

  propTypes: {
    item: React.PropTypes.object,
    additionalDetails: React.PropTypes.string,
    height: React.PropTypes.number,
  },

  getInitialState: function() {
    return {
      showDetails: true,
    };
  },

  toggleDetails: function() {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  },

  outerStyles: function() {
    if (this.props.height) {
      return {
        height: this.props.height,
        position: "relative",
      }
    } else {
      return {}
    }
  },

  headerStyles: function() {
    if (this.props.height) {
      return {
        position: "absolute",
        top: "10px",
        left: "40px",
        width: "auto",
        zIndex: 200,
        right: "50px",
      }
    } else {
      return {}
    }
  },

  zoomStyles: function() {
    if (this.props.height) {
      return {
        height: this.props.height,
        position: "absolute",
        top: 0,
        width: "100%",
      }
    } else {
      return {}
    }
  },

  detailsButtonStyle: function() {
    return {
      backgroundColor: this.state.showDetails ? "#ccc" : "#fff",
    };
  },

  detailsStyle: function() {
    return {
      maxHeight: this.state.showDetails ? "70%" : "0",
      width: this.state.showDetails ? "30%" : "0",
    };
  },

  render: function() {
    var prevLink, nextLink, offsetTop;
    if (this.props.height) {
      offsetTop = this.props.height / 2;
    }
    if (this.props.item) {
      return (

          <div className="item-detail" style={this.outerStyles()}>

            <div style={this.headerStyles()}>
              <h2 className="overflow-ellipsis">{this.props.item.name}</h2>
            </div>
            <button className="btn btn-default btn-raised pull-right btn-details" onClick={this.toggleDetails} style={this.detailsButtonStyle()}>
              <i className={this.state.showDetails ? "mdi-action-visibility-off" : "mdi-action-visibility"}></i>
              Details
            </button>
            <div className="details" style={this.detailsStyle()}>
              <Details item={this.props.item} additionalDetails={this.props.additionalDetails} />
            </div>
            <div className="item-detail-zoom" style={this.zoomStyles()}>
              <OpenseadragonViewer image={this.props.item.image} containerID={this.props.item.id} height={this.props.height} toolbarTop={60} toolbarLeft={40} showFullPageControl={false} />
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
