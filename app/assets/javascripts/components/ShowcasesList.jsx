//app/assets/javascripts/components/ShowcasesList.jsx
var React = require('react');

var ShowcasesList = React.createClass({
  displayName: 'Showcases List',

  propTypes: {
    showcasesUrl: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      showcases: [],
    };
  },
  componentDidMount: function() {
    $.get(this.props.showcasesUrl, function(result) {
      this.setState({
        showcases: result.showcases,
      })
    }.bind(this));
  },
  render: function() {
    var showcaseNodes = this.state.showcases.map(function(showcase, index) {
      var nodes = [];
      nodes.push((
        <div>
          <ShowcasesListItem showcase={showcase} />
        </div>
      ));
      return nodes;
    });
    return (
      <div>
        <h2>Showcase List</h2>
        <div>{showcaseNodes}</div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcasesList;
