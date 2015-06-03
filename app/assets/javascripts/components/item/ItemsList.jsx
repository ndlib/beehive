var React = require('react');

var gridSettings = {
      view: "grid",
      columnClass: "col-lg-3 col-md-4 col-sm-6",
    };
var listSettings = {
      view: "list",
      columnClass: "col-lg-12",
    };
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
      btnStyle: "btn btn-default btn-view",
      view: gridSettings.view,
      columnClass: gridSettings.columnClass,
    };
    var storedState = JSON.parse(localStorage.getItem("GridList"));
    if(storedState) {
      state.view = storedState.view;
      state.columnClass = storedState.columnClass;
    }

    return state;
  },

  toggleView: function() {

    if (this.state.view == "grid") {
      this.setState({view: listSettings.view});
      this.setState({columnClass: listSettings.columnClass});
      localStorage.setItem("GridList", JSON.stringify(listSettings));
    }
    else if(this.state.view == "list") {
      this.setState({view: gridSettings.view});
      this.setState({columnClass: gridSettings.columnClass});
      localStorage.setItem("GridList", JSON.stringify(gridSettings));
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
    var columnClass = this.state.columnClass;
    var itemNodes = this.props.items.map(function(item, index) {
      var nodes = [];
      nodes.push((
          <ItemListItem item={item} className={columnClass}/>
      ));
      return nodes;
    });
    return (
      <div className="items-list" style={this.outerStyle()}>
        <div className="controls" style={this.controlsStyle()}>
          <button className={this.state.btnStyle + " pull-right"} onClick={this.toggleView} onMouseOver={this.onHover} onMouseOut={this.offHover}>
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
