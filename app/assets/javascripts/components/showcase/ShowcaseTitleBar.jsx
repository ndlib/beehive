//app/assets/javascripts/components/ShowcaseTitleBar.jsx
var React = require('react');

var ShowcaseTitleBar = React.createClass({
  displayName: 'Showcase Title Bar',

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      opacity: '0',

    };
  },


  render: function() {
    if (this.props.showcase) {
      return (
        <div className="showcases-title-bar" id="showcases-title-bar" style={this.style()}>
          <div className="container">
            <div className="row">
              <h2>{this.props.showcase.title}</h2>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div />)
    }
  }
});

// each file will export exactly one component
module.exports = ShowcaseTitleBar;
