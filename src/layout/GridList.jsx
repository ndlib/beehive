//app/assets/javascripts/components/layout/GridList.jsx
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var gridSize = 12;

var GridList = createReactClass({
  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    grids: PropTypes.object,
    className: PropTypes.string,
  },

  getDefaultProps: function () {
    return {
      grids: {
        lg: 3,
        sm: 2,
      }
    };
  },

  childGridNodes: function(node, index, nodeClass) {
    var nodes = this.clearfixNodes(index);
    nodes.push((
      <div className={nodeClass} key={index}>
        {node}
      </div>
    ));
    return nodes;
  },

  clearfixNodes: function(index) {
    var nodes = [];
    if (index > 0) {
      for (var prefix in this.props.grids) {
        var columns = this.props.grids[prefix];
        var clearClass = "clearfix visible-" + prefix + "-block";
        if (index%columns == 0) {
          nodes.push ((
            <div className={clearClass} key={index + prefix + "clearfix"} />
          ));
        }
      }
    }
    return nodes;
  },

  childrenGridNodes: function() {
    var index = 0;
    var childrenNodes = []
    var nodeClass = "";
    for (var prefix in this.props.grids) {
      var columns = this.props.grids[prefix];
      nodeClass += " col-" + prefix + "-" + (gridSize / columns);
    }
    React.Children.forEach(this.props.children, function(node, index) {
      childrenNodes.push(this.childGridNodes(node, index, nodeClass));
    }.bind(this));
    return childrenNodes;
  },

  render: function() {
    var children = this.childrenGridNodes();
    var className = "row"
    if (this.props.className) {
      className += " " + this.props.className;
    }
    if (children.length > 0) {
      return (
        <div className={className}>
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
