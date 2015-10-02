
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

  renderButtons: function(collection, searchTerm) {
    var classNames = require('classnames');
    var gridClass = classNames(
      'btn',
      {'btn-default': (this.state.view != 'grid')},
      {'btn-secondary': (this.state.view === 'grid')},
      'btn-view',
      'pull-right'
    );
    var listClass = classNames(
      'btn',
      {'btn-default': (this.state.view != 'list')},
      {'btn-secondary': (this.state.view === 'list')},
      'btn-view',
      'pull-right'
    );
    return (
      <div className="controls" style={this.controlsStyle()}>
        <div className="col-lg-12" >
          <div className="pull-left">
            <SearchBox collection={collection} searchTerm={searchTerm}/>
          </div>
          <button
            className={listClass}
            onClick={this.setList}
            style={{zIndex: '0'}}
          >
            <i className="mdi-action-view-list"></i>
            List
          </button>
          <button
            className={gridClass}
            onClick={this.setGrid}
            style={{zIndex: '0'}}
          >
            <i className= "mdi-action-view-module"></i>
            Grid
          </button>
          <div className="clearfix" />
        </div>
        <div className="clearfix" />
      </div>
    );

  }
}

module.exports = GridListMixin;
