"use strict"
var React = require('react');


var ItemsList = React.createClass({
  displayName: 'Items List',

  propTypes: {
    items: React.PropTypes.array,
    height: React.PropTypes.number.isRequired,
  },

  componentDidUpdate: function() {
    this.checkHash();
  },

  componentDidMount: function() {
    window.addEventListener("hashchange", this.checkHash, false);
    this.checkHash();
  },

  checkHash: function() {
    $(".modal").modal("hide");
    if(window.location.hash) {
      $(window.location.hash).modal('show');
    }
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

        <SearchControls />
        <div className={this.listClass()}>
          {itemNodes}
        </div>
         <div className="clearfix" />
      </div>
    );

  }
});

// each file will export exactly one component
module.exports = ItemsList;
