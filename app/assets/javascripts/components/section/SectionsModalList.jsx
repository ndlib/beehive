//app/assets/javascripts/components/SectionsModalList.jsx
var React = require('react');

var SectionsModalList = React.createClass({
  displayName: 'Sections Modals',

  propTypes: {
    sections: React.PropTypes.array.isRequired,
  },

  render: function() {
    if(this.props.sections) {
      var modalNodes = this.props.sections.map(function(section, index) {
        var nodes = [];
        nodes.push((
          <SectionModal section={section} />
        ));
        return nodes;
      });

      return (
        <div id="sections-modals" className="sections-modals">
          {modalNodes}
        </div>
      );
    } else {
      return (<Loading />);
    }
  }
});

// each file will export exactly one component
module.exports = SectionsModalList;
