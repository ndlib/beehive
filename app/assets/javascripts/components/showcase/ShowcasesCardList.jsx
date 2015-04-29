//app/assets/javascripts/components/ShowcasesCardList.jsx
var React = require('react');

var ShowcasesCardList = React.createClass({
  propTypes: {
    showcases: React.PropTypes.array.isRequired,
  },

  render: function() {
    var showcaseNodes = this.props.showcases.map(function(showcase, index) {
      return (<ShowcaseCard showcase={showcase} key={index} />);
    });
    if (showcaseNodes.length > 0) {
      return (
        <GridList className="showcases-list">
          {showcaseNodes}
        </GridList>
      );
    }
    else {
      return (<span/>);
    }
  }
});

// each file will export exactly one component
module.exports = ShowcasesCardList;
