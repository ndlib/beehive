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
    $.get(this.props.sectionsUrl, function(result) {
      this.setState({
        sections: result.showcases.sections,
      })
    }.bind(this));
  },
  render: function() {
    if(this.state.sections) {
      var sectionNodes = this.state.sections.map(function(section, index) {
        var nodes = [];
        nodes.push((
          <div className="col-sm-4" key={section['@id']}>
            <SectionsListItem section={section} />
          </div>
        ));
        return nodes;
      });
      return (
        <div className="section">
          {sectionNodes}
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }
  }
});

// each file will export exactly one component
module.exports = SectionsList;
