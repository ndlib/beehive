//app/assets/javascripts/components/SectionShow.jsx
var React = require('react');

var SectionShow = React.createClass({
  displayName: 'Section Show',
  propTypes: {
    section: React.PropTypes.object,
  },

  render: function() {
    if (this.props.section) {
      return (
        <div>
          <h2>{this.props.section.title}</h2>
          <div dangerouslySetInnerHTML={{__html: this.props.section.description}} />
          <OpenseadragonViewer image={this.props.section.image} containerID={this.props.section.id} />
          <ItemLink item={this.props.section.item} />
          <PreviousSection section={this.props.section.previousSection} />
          <NextSection section={this.props.section.nextSection} />
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }

  }

});

// each file will export exactly one component
module.exports = SectionShow;
