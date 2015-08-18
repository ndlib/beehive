'use strict'
var React = require('react');
var mui = require('material-ui');
var Dialog = mui.Dialog;
var SearchDisplayList = React.createClass({
  mixins: [GridListMixin, PageHeightMixin, MuiThemeMixin, DialogMixin],

  propTypes: {
    collection: React.PropTypes.object,
    items: React.PropTypes.array,
    searchTerm: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      items: [],
      searchTerm: "",
    };
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
        {this.renderButtons(this.props.collection, this.props.searchTerm)}
        <div className={this.listClass()}>
          {itemNodes}
        </div>
         <div className='clearfix' />
      </div>
    );
  }
});

module.exports = SearchDisplayList;
