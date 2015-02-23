//app/assets/javascripts/components/SectionsList.jsx
var React = require('react');

var SectionsList = React.createClass({
  displayName: 'Sections List',

  propTypes: {
    sectionsUrl: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      sections: [],
    };
  },
  componentDidMount: function() {
    console.log('set state');
    $.get(this.props.sectionsUrl, function(result) {
      this.setState({
        sections: result.showcases.sections,
      })
    }.bind(this));
  },
  render: function() {
  console.log(this.state);
    if(this.state.sections) {
      var sectionNodes = this.state.sections.map(function(section, index) {
        var nodes = [];
        nodes.push((
          <div>
            <SectionsListItem section={section} />
          </div>
        ));
        return nodes;
      });
      return (
        <div>
          <h2>Section List</h2>
          <div>{sectionNodes}</div>
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }
  }
});

// each file will export exactly one component
module.exports = SectionsList;
