//app/assets/javascripts/components/ShowcasesCardList.jsx
var React = require('react');
var mui = require('material-ui');
var theme = require('../../themes/beehive');
var MediaQuery = require('react-responsive');

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

  gridList: function(cols) {
    return (
      <mui.GridList cols={cols} padding={theme.spacing.desktopGutter} cellHeight="auto">
        {this.allNodes()}
      </mui.GridList>
    );
  },

  render: function() {
    if (this.props.showcases.length > 0 || this.props.intro) {
      return (
        <div>
          <MediaQuery maxWidth={650}>
            {this.gridList(1)}
          </MediaQuery>
          <MediaQuery maxWidth={1224}>
            {this.gridList(2)}
          </MediaQuery>
          <MediaQuery maxWidth={1724}>
            {this.gridList(3)}
          </MediaQuery>
          <MediaQuery minWidth={1724}>
            {this.gridList(4)}
          </MediaQuery>
        </div>
      );
    }
    else {
      return (<span/>);
    }
  }
});

// each file will export exactly one component
module.exports = ShowcasesCardList;
