//app/assets/javascripts/components/ItemsList.jsx
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


  getInitialState: function() {
    return {
      view: "grid",
      btnStyle: "btn btn-default btn-view",
    };
  },

  toggleView: function() {
    if (this.state.view == "grid") {
      this.setState({view: "list"});
    }
    else if(this.state.view == "list") {
      this.setState({view: "grid"});
    }
  },

  onHover: function() {
    this.setState({btnStyle: "btn btn-default btn-raised btn-view"});
  },

  offHover: function() {
    this.setState({btnStyle: "btn btn-default btn-view"});
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

  listClass: function() {
    return this.state.view;
  },

  render: function() {
    var itemNodes = this.props.items.map(function(item, index) {
      var nodes = [];
      nodes.push((
          <ItemListItem item={item} />
      ));
      return nodes;
    });
    return (
      <div className="items-list" style={this.outerStyle()}>
        <div >
          <button className={this.state.btnStyle + " pull-right"} onClick={this.toggleView} onMouseOver={this.onHover} onMouseOut={this.offHover}>
            <i className={this.state.view == "grid" ? "mdi-action-view-list" : "mdi-action-view-module"}></i>
            {this.state.view == "grid" ? "list" : "grid"}
          </button>
          <div className="clearfix visible-lg-block" />
        </div>
        <div className={this.listClass()}>
          {itemNodes}
        </div>
      </div>
    );

  }
});

// each file will export exactly one component
module.exports = ItemsList;
