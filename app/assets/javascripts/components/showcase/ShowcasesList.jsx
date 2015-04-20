//app/assets/javascripts/components/ShowcasesList.jsx
var React = require('react');

var ShowcasesList = React.createClass({
  displayName: 'Showcases List',

  propTypes: {
    showcases: React.PropTypes.array.isRequired,
  },

  render: function() {
    var showcaseNodes = this.props.showcases.map(function(showcase, index) {
      var nodes = [];
      nodes.push((
        <div className="showcase-block" key={showcase['@id']}>
          <ShowcasesListItem showcase={showcase} />
        </div>
      ));
      return nodes;
    });
    if (showcaseNodes.length > 0) {
      return (
        <div className="showcases-list">
          <div className="container flow-columns">
            {showcaseNodes}
          </div>
        </div>
      );
    }
    else {
      return (<span/>);
    }
  }
});

// each file will export exactly one component
module.exports = ShowcasesList;
