
var gridView = {view: "grid"};
var listView = {view: "list"};

var GridListMixin = {
  getInitialState: function() {
    var state = {
      view: "grid",
    };
    var storedState = JSON.parse(localStorage.getItem("ListViewLayout"));
    if(storedState) {
      state.view = storedState.view;
    }

    return state;
  },

  controlsStyle: function() {
    return {
      marginBottom: "20px",
      paddingLeft: "15px",
      paddingRight: "15px",
    };
  },

  toggleView: function() {

    if (this.state.view == "grid") {
      this.setList();
    }
    else if(this.state.view == "list") {
      this.setGrid();
    }
  },

  setGrid: function() {
    this.setState({view: "grid"});
    localStorage.setItem("ListViewLayout", JSON.stringify(gridView));
  },

  setList: function() {
    this.setState({view: "list"});
    localStorage.setItem("ListViewLayout", JSON.stringify(listView));
  },

  listClass: function() {
    return this.state.view;
  },

  renderButtons: function(searchTerm) {
    var cx = React.addons.classSet;
    var gridClass = cx({
      'btn': true,
      'btn-default': (this.state.view != 'grid'),
      'btn-primary': (this.state.view === 'grid'),
      'btn-view': true,
      'pull-right': true,
    });
    var listClass = cx({
      'btn': true,
      'btn-default': (this.state.view != 'list'),
      'btn-primary': (this.state.view === 'list'),
      'btn-view': true,
      'pull-right': true,
    });
    return (

      <div className="controls" style={this.controlsStyle()}>
        <SearchBox searchTerm={searchTerm}/>
        <SearchSort />
        <button className={listClass} onClick={this.setList} >
          <i className="mdi-action-view-list"></i>
          List
        </button>
        <button className={gridClass} onClick={this.setGrid} >
          <i className= "mdi-action-view-module"></i>
          Grid
        </button>
        <div className="clearfix" />
      </div>
    );

  }
}

module.exports = GridListMixin;
