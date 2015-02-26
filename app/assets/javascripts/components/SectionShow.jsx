//app/assets/javascripts/components/SectionShow.jsx
var React = require('react');

var SectionShow = React.createClass({
  displayName: 'Section Show',
  propTypes: {
    sectionsUrl: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      section: null,
    };
  },
  componentDidMount: function() {
    $.get(this.props.sectionsUrl, function(result) {
      this.setState({
        collection: result,
        showcase: result.showcases,
        section: result.showcases.sections,
      })
    }.bind(this));
  },

  render: function() {
    if (this.state.section) {
      return (
        <div>
          <h2>{this.state.section.title}</h2>
          <div dangerouslySetInnerHTML={{__html: this.state.section.description}} />
          <OpenseadragonViewer image={this.state.section.image} containerID={this.state.section.id} />
          <ItemLink item={this.state.section.item} />
          <PreviousSection section={this.state.section.previousSection} />
          <NextSection section={this.state.section.nextSection} />
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }

  }

});

// each file will export exactly one component
module.exports = SectionShow;
