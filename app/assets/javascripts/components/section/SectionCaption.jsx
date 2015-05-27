//app/assets/javascripts/components/SectionCaption.jsx
var React = require('react');

var SectionCaption = React.createClass({
  displayName: 'Section Image',

  propTypes: {
    caption: React.PropTypes.string,
  },

  render: function () {
    if (this.props.caption) {
      return (
        <div className="section-caption" dangerouslySetInnerHTML={{__html: this.props.caption}}/>
      );
    } else {
      return null;
    }
  }

});

// each file will export exactly one component
module.exports = SectionCaption;
