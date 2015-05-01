//app/assets/javascripts/components/ShowcasesCardList.jsx
var React = require('react');

var ShowcasesCardList = React.createClass({
  propTypes: {
    showcases: React.PropTypes.array.isRequired,
  },

  showcaseNodes: function() {
    return this.props.showcases.map(function(showcase, index) {
      return (<ShowcaseCard showcase={showcase} key={index} />);
    });
  },

  render: function() {
    if (this.props.showcases.length > 0) {
      return (
        <GridList className="showcases-list">
          {this.showcaseNodes()}
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
