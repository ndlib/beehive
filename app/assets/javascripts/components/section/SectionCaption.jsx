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
        backgroundColor: 'rgba(255,255,255,.5)',
        color: '#333',
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
      <div className="section-caption" style={this.style()}>
        {this.props.caption}
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = SectionCaption;
