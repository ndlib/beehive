var React = require("react");

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
    }
  },

  sections: function() {
    var sections = this.props.showcase.sections;
    if(sections) {
      var sectionNodes = sections.map(function(section, index) {
        var nodes = [];

        nodes.push((
          <Section section={section} height={this.props.height} />
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
      nextShowcase = (<ShowcaseEnding height={this.props.height} showcase={this.props.showcase.nextShowcase} />);
    }
    return nextShowcase;
  },

  render: function() {
    return (
      <div id="sections-content-inner" className="sections-content-inner" style={this.style()}>
        {this.sections()}
        {this.nextShowcase()}
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseSections;
