var React = require('react');

var gridView = {view: "grid"};
var listView = {view: "list"};

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
    var state = {
      view: "grid",
    };
    var storedState = JSON.parse(localStorage.getItem("ItemViewLayout"));
    if(storedState) {
      state.view = storedState.view;
    }

    return state;
  },

  toggleView: function() {

    if (this.state.view == "grid") {
      this.setState({view: "list"});
      localStorage.setItem("ItemViewLayout", JSON.stringify(listView));
    }
    else if(this.state.view == "list") {
      this.setState({view: "grid"});
      localStorage.setItem("ItemViewLayout", JSON.stringify(gridView));
    }
  },

  checkHash: function() {
    $(".modal").modal("hide");
    if(window.location.hash) {
      $(window.location.hash).modal('show');
    }
  },

  controlsStyle: function() {
    return {
      marginBottom: "20px",
      paddingLeft: "15px",
      paddingRight: "15px",
    };
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
        <div className="controls" style={this.controlsStyle()}>
          <button className={"btn btn-default btn-view pull-right"} onClick={this.toggleView} >
            <i className={this.state.view == "grid" ? "mdi-action-view-list" : "mdi-action-view-module"}></i>
            {this.state.view == "grid" ? "list" : "grid"}
          </button>
          <div className="clearfix" />
        </div>
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
