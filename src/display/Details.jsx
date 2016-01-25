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

  paperStyle: function() {
    return {
      maxHeight: "70%",
      width: "30%",
      position: "absolute",
      right: "70px",
      zIndex: "100",
      opacity: "0.8",
      backgroundColor: "#fff",
      overflow: "auto"
    };
  },

  detailsStyle: function () {
    return {
      display: this.state.showDetails ? "block" : 'none',
      padding: "10px",
      paddingTop: "35px",
    }
  },

  render: function () {
    return (
      <mui.Paper className="details" style={this.paperStyle()}>
        <mui.RaisedButton
          onClick={this.toggleDetails}
          style={this.detailsButtonStyle()}
          disableTouchRipple={true}
          labelPosition="after"
        >
          <span style={{fontSize: "20px", letterSpacing: "0", textTransform: "uppercase", fontWeight: "500", padding: "0px 10px" }}>
            Details
            <mui.FontIcon className="material-icons" style={{verticalAlign:'top', marginLeft:'5px'}}>{this.state.showDetails ? "arrow_forward" : "arrow_back"}</mui.FontIcon>
          </span>
        </mui.RaisedButton>

        <div className="item-details" style={this.detailsStyle()}>
          <div className="additional-details" dangerouslySetInnerHTML={{__html: this.props.additionalDetails}} />
          <MetadataList metadata={this.props.item.metadata} />
        </div>
      </mui.Paper>
    );
  }
});

module.exports = Details;
