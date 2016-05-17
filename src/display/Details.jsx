'use strict'
var React = require("react");
var mui = require("material-ui");

var MetadataList = require('../display/MetadataList.jsx');

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

  detailsButtonStyle: function() {
    var arr = {
      backgroundColor: this.getCurrentPallette().accent3Color,
      position: "absolute",
      top: "-45px",
      right: "0",
    };

    return arr;
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
        style={this.detailsButtonStyle()}
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
        <div className="item-details" style={this.detailsStyle()}>
          <div className="additional-details" dangerouslySetInnerHTML={{__html: this.props.additionalDetails}} />
          <MetadataList metadata={this.props.item.metadata} />
        </div>
      );
    } else {
      return null;
    }
  },

  paperStyle: function() {
    return {
      height: this.state.showDetails ? "70%" : "0px",
      width: "30%",
      position: "absolute",
      right: "70px",
      zIndex: "100",
      opacity: "0.8",
      backgroundColor: "#fff",
      overflow: "visible"
    };
  },

  detailsStyle: function () {
    return {
      display: "block",
      padding: "10px",
      paddingTop: "35px",
      overflow: "auto",
      height: "100%"
    }
  },

  render: function () {
    return (
      <mui.Paper className="details" style={this.paperStyle()}>
        { this.detailsButton() }
        { this.details() }
      </mui.Paper>
    );
  }
});

module.exports = Details;
