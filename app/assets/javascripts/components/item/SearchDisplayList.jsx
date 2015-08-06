'use strict'
var React = require('react');
var mui = require('material-ui');
var Dialog = mui.Dialog;
var RaisedButton = mui.RaisedButton;
var FontIcon = mui.FontIcon;
var EventEmitter = require('../../EventEmitter');

var SearchDisplayList = React.createClass({
  mixins: [GridListMixin, MuiThemeMixin, DialogMixin, PageHeightMixin],

  propTypes: {
    items: React.PropTypes.array

  },
  componentWillMount: function() {
    EventEmitter.on("ItemDialogWindow", this.showDisplayItemWindow);
    //EventEmitter.on("ItemStoreChanged", this.setCurrentItem);
  },

  getInitialState: function () {
    return {
      displayWindowActive: false,
      currentItem: null,
    };
  },

  outerStyle: function() {
    return {
      width: '100%',
      backgroundColor: '#f5f5f5',
    };
  },

  showDisplayItemWindow: function(item) {
    console.log("DISPLAY WINDOW");
    this.setState({
      displayWindowActive: true,
      currentItem: item
    });
    this.refs.itemDialogWindow.show();
  },

  dismissMessage: function() {
    this.hideDisplayItemWindow();
  },

  hideDisplayItemWindow: function() {
    this.setState({
      displayWindowActive: false,
    });
    this.refs.itemDialogWindow.dismiss();
  },

  dialogWindowStyle: function() {
    return {
      color: 'black',
    };
  },

  displayItemWindow: function() {
    return (
      <Dialog
        ref='itemDialogWindow'
        modal={false}
        openImmediately={false}
        style={this.dialogWindowStyle()}
        actions={this.okDismiss()}
      >
        <ItemShow item={this.state.currentItem} height={this.state.height} />
      </Dialog>
    );

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
      <div className='items-list' style={this.outerStyle()}>
        {this.displayItemWindow()}
        {this.renderButtons()}
        <div className={this.listClass()}>
          {itemNodes}
        </div>
         <div className='clearfix' />
      </div>
    );
  }
});

module.exports = SearchDisplayList;
