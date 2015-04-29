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
        <div className="row">
        <div className="col-sm-2">
            <div className="about-collection">
              <h2>About</h2>
              <h3>Name of Curator</h3>
              <p><em>Title or Position</em><br/>Hesburgh Libraries</p>
              <p>p: 124-123-1234<br/>e: name@nd.edu</p>
            </div>
          </div>
        <div className="col-sm-10">

        <div className="showcases-list">
          <div className="">
            <h2>Featured Content</h2>
            <div className="row">{showcaseNodes}</div>
          </div>
        </div>
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
