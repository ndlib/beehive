'use strict'
var React = require('react');
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var BeehiveTheme = require('../themes/beehive.jsx');

var EventEmitter = require('../middleware/EventEmitter.js');
var HoneycombURL = require('../modules/HoneycombURL.js');
var Details = require('../display/Details.jsx');
var ConfigurationActions = require("../actions/ConfigurationActions.js");
var ConfigurationStore = require("../store/ConfigurationStore.js");

const LoadRemote = require('../modules/LoadRemote.jsx')
const CollectionUrl = require('../modules/CollectionUrl.jsx')

var PrintableMetadata = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(BeehiveTheme),
    };
  },

  componentWillMount: function() {
    ConfigurationStore.addChangeListener(this.configurationLoaded);
    LoadRemote.withCallback(CollectionUrl.remoteItem(this.props.params.itemID), this.setItem.bind(this));
  },

  componentWillUnmount: function() {
    ConfigurationStore.removeChangeListener(this.configurationLoaded);
  },

  setItem: function(result) {
    let item = result.items
    this.setState({
      item: item,
    });

    if(item["isPartOf/collection"]) {
      var collectionUrl = item["isPartOf/collection"];
      LoadRemote.loadRemoteCollection(collectionUrl, this.setValues.bind(this));
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
