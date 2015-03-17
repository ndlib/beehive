//app/assets/javascripts/components/ShowcaseShow.jsx
var React = require('react');

var ShowcaseShow = React.createClass({
  displayName: 'Showcase Show',
  propTypes: {
    showcase: React.PropTypes.object,
  },

  style: function() {
    return {
      position: 'relative',
      overflowY: 'hidden',
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      height: '500px',
      top: 0,
      left: 0,
      border: '1px solid #bed5cd',
      padding: '10px',
      marginBottom: '2em',
    };
  },
  render: function() {
    if (this.props.showcase) {
      return (
        <div id="main-showcase" style={this.style()}>
          <ShowcaseEditorTitle showcase={this.props.showcase} />
          <SectionsList sections={this.props.showcase.sections} />
        </div>
      )
    } else {
      return (<Loading />)
    }
  }
});

// each file will export exactly one component
module.exports = ShowcaseShow;
