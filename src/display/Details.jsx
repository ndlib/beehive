'use strict'
var React = require("react");
var mui = require("material-ui");

var MetadataList = require('../display/MetadataList.jsx');

var Styles = {
  // The outer containing div for this component
  outer: {
    boxShadow: "0 -5px 5px -5px rgba(0, 0, 0, 0.16), 0 -5px 5px -5px rgba(0, 0, 0, 0.23)",
    margin: "0 auto 60px",
    position: "relative",
    width: "100%",
    zIndex: 1,
  },
  // The details Paper
  details: {
    backgroundColor: "#fff",
    color: "#555",
    display: "block",
    fontSize: "16px",
    padding: "10px",
    paddingTop: "35px",
    opacity: "0.8",
    margin: "0 auto 60px",
    width: "100%",
    maxWidth: "60em",
  },
};

var Details = React.createClass({
  propTypes: {
    item: React.PropTypes.object,
    additionalDetails: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      showDetails: true,
      printable: true,
    }
  },

  getInitialState: function() {
    return {
      showDetails: this.props.showDetails,
    };
  },

  toggleDetails: function() {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  },

  arrowIcon: function() {
    return (
      <mui.FontIcon className="material-icons" style={{ verticalAlign:'top', margin:'5px 10px 5px 0px' }}>
        { this.state.showDetails ? "arrow_forward" : "arrow_back" }
      </mui.FontIcon>
    );
  },

  details: function() {
    if(this.state.showDetails){
      return (
        <div className="item-details" style={ Styles.details }>
          <div className="additional-details" dangerouslySetInnerHTML={{__html: this.props.additionalDetails}} />
          <MetadataList metadata={this.props.item.metadata} id={this.props.item.id} printable={this.props.printable} />
        </div>
      );
    } else {
      return null;
    }
  },

  render: function () {
    return (
      <mui.Paper zDepth={0} style={ Styles.outer }>
        { this.details() }
      </mui.Paper>
    );
  }
});

module.exports = Details;
