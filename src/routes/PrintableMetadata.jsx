'use strict'
var React = require('react');
var mui = require('material-ui');

var EventEmitter = require('../middleware/EventEmitter.js');
var HoneycombURL = require('../modules/HoneycombURL.js');
var Details = require('../display/Details.jsx');
var ConfigurationActions = require("../actions/ConfigurationActions.js");
var ConfigurationStore = require("../store/ConfigurationStore.js");

var PrintableMetadata = React.createClass({
  mixins: [
    require("../mixins/LoadRemoteMixin.jsx"),
    require("../mixins/MuiThemeMixin.jsx")
  ],

  componentWillMount: function() {
    ConfigurationStore.addChangeListener(this.configurationLoaded);
    EventEmitter.on("ItemDialogWindow", this.setItem);
    var url = HoneycombURL() + '/v1/items/' + this.props.params.itemID;
    this.loadRemoteItem(url);
  },

  setItem: function(item) {
    this.setState({
      item: item,
    });

    if(item["isPartOf/collection"]) {
      var collectionUrl = item["isPartOf/collection"];
      this.loadRemoteCollection(collectionUrl);
    } else {
      this.setState({ "configurationLoaded": true });
    }
  },

  setValues: function(result) {
    ConfigurationActions.load(result);
  },

  configurationLoaded: function(){
    this.setState({ configurationLoaded: true });
  },

  render: function() {
    if(this.state.item && this.state.configurationLoaded) {
      return (
        <Details item={this.state.item} showDetails={true} printable={false} />
      );
    } else {
      return (<div/>);
    }
  }
});

export default PrintableMetadata;
