//app/assets/javascripts/components/SectionsList.jsx
var React = require('react');

var SectionsList = React.createClass({
  displayName: 'Sections List',

  propTypes: {
    sections: React.PropTypes.array.isRequired,
  },
  style: function() {
    return {
      height: '100%',
      display: 'inline-block',
      paddingRight: '175px',
    }
  },
  render: function() {
    if(this.props.sections) {
      var sectionNodes = this.props.sections.map(function(section, index) {
        var nodes = [];

        nodes.push((
          <Section section={section} />
        ));
        return nodes;
      });
      return (
        <div id="sections-content-inner" className="sections-content-inner" style={this.style()}>
          {sectionNodes}
        </div>
      );
    } else {
      return (<Loading />);
    }
  }
});

// each file will export exactly one component
module.exports = SectionsList;
