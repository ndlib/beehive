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
      if (index > 0) {
        if (index%3 == 0) {
          nodes.push ((
            <div className="clearfix"></div>
          ));
        }
      }
      nodes.push((
        <div className="col-sm-3" key={showcase['@id']}>
          <ShowcasesListItem showcase={showcase} />
        </div>
      ));
      return nodes;
    });
    if (showcaseNodes.length > 0) {
      return (
        <div className="showcases-list">
          <div className="row">{showcaseNodes}</div>
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
