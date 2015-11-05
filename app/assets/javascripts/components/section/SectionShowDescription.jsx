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
      };
    } else {
      return {};
    }
  },

  render: function() {
    return (
      <div style={this.styles()}>
        <div className="row">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{__html: this.props.section.description}} />
          </div>
        </div>
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = SectionShowDescription;
