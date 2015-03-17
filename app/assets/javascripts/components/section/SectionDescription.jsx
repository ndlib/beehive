//app/assets/javascripts/components/SectionDescription.jsx
var React = require('react');

var converter = new Showdown.converter()

var SectionDescription = React.createClass({
  propTypes: {
    section: React.PropTypes.object.isRequired
  },

  style: function() {
    return {
      display: 'inline-block',
      padding: '5px',
      width: '300px',
      overflow: 'hidden',
      height: '100%',
      whiteSpace: 'normal',
      textOverflow: 'ellipsis',
    };
  },

  render: function () {
    var rawMarkup = false;
    if (this.props.section.description) {
      rawMarkup = this.props.section.description.toString();
    }

    if (rawMarkup) {
      return (
        <div className="section-container section-container-text" style={this.style()}>
          <h2>{this.props.section.title}</h2>
          <DescriptionTeaser description={rawMarkup} />
        </div>
      );
    } else {
      return (<div />)
    }
  }
});

// each file will export exactly one component
module.exports = SectionDescription;
