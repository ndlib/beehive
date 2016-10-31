'use strict'
var React = require('react');
var mui = require('material-ui');

var EventEmitter = require('../middleware/EventEmitter.js');
var HoneycombURL = require('../modules/HoneycombURL.js');
var Details = require('../display/Details.jsx');

var PrintableMetadata = React.createClass({
  mixins: [
    require("../mixins/LoadRemoteMixin.jsx"),
    require("../mixins/MuiThemeMixin.jsx")
  ],

  componentWillMount: function() {
    EventEmitter.on("ItemDialogWindow", this.setItem);
    var url = HoneycombURL() + '/v1/items/' + this.props.params.itemID;
    this.loadRemoteItem(url);
  },

  setItem: function(item) {
    this.setState({
      item: item,
    });
  },

  render: function() {
    if(this.state.item) {
      return (
        <Details item={this.state.item} showDetails={true} printable={false} />
      );
    } else {
      return (<div/>);
    }
  }
});

export default PrintableMetadata;
