//app/assets/javascripts/components/SectionShow.jsx
var React = require('react');

var SectionShowDescription = React.createClass({
  displayName: 'Section Show Description',
  propTypes: {
    section: React.PropTypes.object.isRequired,
    height: React.PropTypes.number,
  },

  styles: function() {
    if (this.props.height) {
      return {
        height: this.props.height + 'px',
        overflowY: 'scroll',
        maxWidth: "60em",
        margin: '0 auto'
      };
    } else {
      return {};
    }
  },

  render: function() {
    return (
      <PageContent>
        <div ref="sectionContent" style={this.styles()} dangerouslySetInnerHTML={{__html:this.props.section.description}} />
      </PageContent>
    );
  }

});

// each file will export exactly one component
module.exports = SectionShowDescription;
