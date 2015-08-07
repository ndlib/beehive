'use strict'
var React = require('react');
var mui = require('material-ui');
var Dialog = mui.Dialog;
var RaisedButton = mui.RaisedButton;
var FontIcon = mui.FontIcon;

var SearchDisplayList = React.createClass({
  mixins: [GridListMixin, PageHeightMixin, MuiThemeMixin, DialogMixin],

  propTypes: {
    items: React.PropTypes.array

  },

  outerStyle: function() {
    return {
      width: '100%',
      backgroundColor: '#f5f5f5',
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
