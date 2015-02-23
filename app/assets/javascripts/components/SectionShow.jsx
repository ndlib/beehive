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
        section: result.showcases.sections,
      })
    }.bind(this));
  },

  render: function() {
    console.log(this.state);
    if (this.state.section) {
      return (
        <div>
          <h2>Section</h2>
          <div>{this.state.section.id}</div>
          <div>{this.state.section.slug}</div>
          <div>{this.state.section.title}</div>
          <div dangerouslySetInnerHTML={{__html: this.state.section.description}} />
          <Thumbnail image={this.state.section.image} thumbnailType="small" />
          <div>{this.props.sectionsUrl}</div>
          <ItemLink item={this.state.section.item} />
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }

  }

});

// each file will export exactly one component
module.exports = SectionShow;
