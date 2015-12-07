//app/assets/javascripts/components/Details.jsx
var React = require("react");
var mui = require("material-ui");

var Details = React.createClass({
  mixins: [ CurrentThemeMixin ],

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
      top: "-20px"
    };
    if (this.state.showDetails) {
      arr["left"] = "-20px";
    } else {
      arr["right"] = "-20px";
    }

    return arr;
  },

  paperStyle: function() {
    return {
      maxHeight: "70%",
      width: "30%",
      position: "absolute",
      right: "30px",
      zIndex: "100",
      opacity: "0.8",
      backgroundColor: "#fff",
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
        <mui.FloatingActionButton
          onClick={this.toggleDetails}
          style={this.detailsButtonStyle()}
          secondary={true}
          mini={true}
          disableTouchRipple={true}
        >
          <mui.FontIcon className="material-icons">{this.state.showDetails ? "arrow_forward" : "arrow_back"}</mui.FontIcon>
        </mui.FloatingActionButton>

        <div className="item-details" style={this.detailsStyle()}>
          <div className="additional-details" dangerouslySetInnerHTML={{__html: this.props.additionalDetails}} />
          <MetadataList metadata={this.props.item.metadata} />
        </div>
      </mui.Paper>
    );
  }
});

module.exports = Details;
