//app/assets/javascripts/components/ShowcasesCardList.jsx
var React = require('react');
var mui = require('material-ui');

var ShowcasesCardList = React.createClass({
  propTypes: {
    showcases: React.PropTypes.array.isRequired,
    intro: React.PropTypes.element,
  },

  showcaseNodes: function() {
    return this.props.showcases.map(function(showcase, index) {
      return (<ShowcaseCard showcase={showcase} key={index} />);
    });
  },

  allNodes: function() {
    var nodes = [];
    if (this.props.intro) {
      nodes.push(
        <div key="intro">{this.props.intro}</div>
      );
    }
    return nodes.concat(this.showcaseNodes());
  },

  render: function() {
    var grids = {
      lg: 2,
      sm: 1,
    }
    if (this.props.showcases.length > 0 || this.props.intro) {
      return (
        <mui.GridList>
          {this.allNodes()}
        </mui.GridList>
      );
    }
    else {
      return (<span/>);
    }
  }
});

// each file will export exactly one component
module.exports = ShowcasesCardList;
