var React = require("react");
var mui = require('material-ui');

var ShowcaseSections = React.createClass({
  displayName: "Sections List",

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  style: function() {
    return {
      height: this.props.height + "px",
      display: "inline-block",
      paddingRight: "175px",
      lineHeight: this.props.height + "px",
      boxShadow: "none",
    }
  },

  sections: function() {
    var sections = this.props.showcase.sections;
    if(sections) {
      var sectionNodes = sections.map(function(section, index) {
        var nodes = [];

        nodes.push((
          <SectionCard section={section} height={this.props.height} />
        ));
        return nodes;
      }.bind(this));
      return sectionNodes;
    } else {
      return (<Loading />);
    }
  },

  nextShowcase: function() {
    var nextShowcase;
    if(this.props.showcase.nextShowcase) {
      nextShowcase = (<ShowcaseEndingCard height={this.props.height} showcase={this.props.showcase.nextShowcase} />);
    }
    return nextShowcase;
  },

  render: function() {
    return (
      <mui.Paper id="sections-content-inner" className="sections-content-inner" style={this.style()}>
        {this.sections()}
        {this.nextShowcase()}
      </mui.Paper>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseSections;
