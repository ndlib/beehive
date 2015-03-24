//app/assets/javascripts/components/SectionCaption.jsx
var React = require('react');

var SectionCaption = React.createClass({
  displayName: 'Section Image',

  propTypes: {
    caption: React.PropTypes.string,
  },

  style: function() {
    if (this.props.caption) {
      return {
        backgroundColor: 'rgba(0,0,0,.5)',
        color: '#fff',
        position: 'absolute',
        bottom: '1em',
        right: '0em',
        marginLeft: '20%',
        padding: '0.5em',
        whiteSpace: 'normal',
      };
    } else {
      return {
        display: 'none',
      };
    }
  },

  render: function () {
    return (
        <div className="section-caption" style={this.style()} dangerouslySetInnerHTML={{__html: this.props.caption}}/>
    );
  }

});

// each file will export exactly one component
module.exports = SectionCaption;
