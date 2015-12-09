var React = require('react');
var mui = require('material-ui');
var MoreOverlay = require("./MoreOverlay");

var TextCard = React.createClass({
  propTypes: {
    section: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      showMoreLink: false,
    };
  },

  componentDidMount: function() {
    if (this.showMoreLink()) {
      this.setState({
        showMoreLink: true
      });
    }
  },

  titleStyle: function() {
    return {
      color: "lightgrey",
    }
  },

  style: function() {
    return {
      color:'lightgrey',
      paddingTop:'0',
      maxWidth: Math.floor(window.innerWidth *0.9) + 'px',
    };
  },

  showMoreLink: function() {
    if (this.refs["sectionTextContent"]) {
      var textContent = this.refs["sectionTextContent"];
      var testHeight = textContent.offsetParent.clientHeight;
      if (this.refs["sectionTitleContent"]) {
        testHeight -= this.refs["sectionTitleContent"].offsetParent.clientHeight + 15;
      }

      return (textContent.clientHeight > testHeight);
    }
    return false;
  },

  overflowText: function() {
    if (this.showMoreLink()) {
      return(<MoreOverlay />)
    }
    return (<div/>);
  },

  render: function () {
    var title = (<div ref="sectionTitleContent">{this.props.section.name}</div>);
    return (
      <div style={this.style()} className="text">
        <mui.CardTitle title={title} titleStyle={this.titleStyle()} />
        <mui.CardText style={this.style()}>
          <div ref="sectionTextContent" dangerouslySetInnerHTML={{__html: this.props.section.description}} />
          {this.overflowText()}
        </mui.CardText>
      </div>
    );
  },
});

// each file will export exactly one component
module.exports = TextCard;
