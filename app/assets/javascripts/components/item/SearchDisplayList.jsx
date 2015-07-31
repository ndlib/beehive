"use strict"
var React = require("react");

var SearchDisplayList = React.createClass({
  mixins: [GridListMixin],

  propTypes: {
    items: React.PropTypes.array

  },

  outerStyle: function() {
    return {
      width: "100%",
      backgroundColor: "#f5f5f5",
    };
  },

  render: function() {
    var view = this.state.view;
    var itemNodes = this.props.items.map(function(item, index) {
      var nodes = [];
      nodes.push((
          <ItemListItem item={item} view={view}/>
      ));
      return nodes;
    });
    return (
      <div className="items-list" style={this.outerStyle()}>

        {this.renderButtons()}
        <div className={this.listClass()}>
          {itemNodes}
        </div>
         <div className="clearfix" />
      </div>
    );
  }
});

module.exports = SearchDisplayList;
