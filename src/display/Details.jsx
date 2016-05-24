'use strict'
var React = require("react");
var mui = require("material-ui");

var MetadataList = require('../display/MetadataList.jsx');

var Styles = {
  // The outer containing div for this component
  outer: {
    height: "100%",
    position: "absolute",
    right: "70px",
    zIndex: 100,
    width: "350px"
  },
  // The details Paper
  details: {
    backgroundColor: "#fff",
    color: "#555",
    display: "block",
    padding: "10px",
    paddingTop: "35px",
    position: "relative",
    overflow: "auto",
    opacity: "0.8",
    maxHeight: "70%",
    top: "5px",
    width: "100%",
  },
  // The shrink/expand details button
  detailsButton: {
    position: "relative",
    left: "220",
  },
};

var Details = React.createClass({
  mixins: [
    require('../mixins/CurrentThemeMixin.jsx')
  ],

  propTypes: {
    item: React.PropTypes.object,
    additionalDetails: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      showDetails: true
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

  detailsButton: function() {
    return (
      <mui.RaisedButton
        onClick={this.toggleDetails}
        style={ Styles.detailsButton }
        disableTouchRipple={true}
        label="Details"
        labelStyle={{fontSize: "20px", letterSpacing: "0", textTransform: "uppercase", fontWeight: "500", padding: "0px 10px" }}
      >
        { this.arrowIcon() }
      </mui.RaisedButton>
    );
  },

  details: function() {
    if(this.state.showDetails){
      return (
        <mui.Paper className="item-details" style={ Styles.details }>
          <div className="additional-details" dangerouslySetInnerHTML={{__html: this.props.additionalDetails}} />
          <MetadataList metadata={this.props.item.metadata} />
        </mui.Paper>
      );
    } else {
      return null;
    }
  },

  render: function () {
    return (
      <div style={ Styles.outer }>
        { this.detailsButton() }
        { this.details() }
      </div>
    );
  }
});

module.exports = Details;
