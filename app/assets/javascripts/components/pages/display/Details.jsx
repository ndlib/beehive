//app/assets/javascripts/components/Details.jsx
var React = require("react");
var mui = require("material-ui");

var Details = React.createClass({

  propTypes: {
    item: React.PropTypes.object,
    additionalDetails: React.PropTypes.string,
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

  detailsButtonStyle: function() {
    return {
      backgroundColor: this.state.showDetails ? "#ccc" : "#fff",
      position: "absolute",
      right: "0",
      top: "-35px"
    };
  },

  paperStyle: function() {
    return {
      maxHeight: "70%",
      width: "30%",
      position: "absolute",
      right: "0",
      zIndex: "100",
      opacity: "0.8",
      backgroundColor: "#fff",
    };
  },

  detailsStyle: function () {
    return {
      display: this.state.showDetails ? "block" : 'none',
    }
  },

  render: function () {
    return (
      <mui.Paper className="details" style={this.paperStyle()}>
        <button className="btn btn-default btn-raised pull-right btn-details" onClick={this.toggleDetails} style={this.detailsButtonStyle()}>
          <i className='material-icons'>{this.state.showDetails ? "visibility_off" : "visibility"}</i>
          Details
        </button>
        <div className="item-details" style={this.detailsStyle()}>
          <div className="additional-details" dangerouslySetInnerHTML={{__html: this.props.additionalDetails}} />
          <MetadataList metadata={this.props.item.metadata} />
        </div>
      </mui.Paper>
    );
  }
});

module.exports = Details;
