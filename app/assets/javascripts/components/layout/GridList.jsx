//app/assets/javascripts/components/layout/GridList.jsx
var React = require('react');

var GridList = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]).isRequired,
  },

  childrenGridNodes: function() {
    var index = 0;
    var childrenNodes = []
    React.Children.forEach(this.props.children, function(node) {
      var nodes = [];
      if (index > 0) {
        if (index%3 == 0) {
          nodes.push ((
            <div className="clearfix" key={index + "clearfix"}></div>
          ));
        }
      }
      nodes.push((
        <div className="col-sm-4" key={index}>
          {node}
        </div>
      ));
      index += 1;
      childrenNodes.push(nodes);
    });
    return childrenNodes;
  },

  render: function() {
    var children = this.childrenGridNodes();
    if (children.length > 0) {
      return (
        <div className="row">
          {children}
        </div>
      );
    }
    else {
      return (<span/>);
    }
  }
});

// each file will export exactly one component
module.exports = GridList;
