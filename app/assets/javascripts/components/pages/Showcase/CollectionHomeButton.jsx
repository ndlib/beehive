'use strict'
var React = require("react");
var mui = require("material-ui");

var CollectionHomeButton = React.createClass({
  mixins: [ CollectionUrlMixin, CurrentThemeMixin ],

  propTypes: {
    collection: React.PropTypes.object,
  },

  onClick: function() {
    window.location = this.collectionUrl(this.props.collection);
  },

  render: function() {
    return (
      <mui.FloatingActionButton
        onClick={this.onClick}
        disableTouchRipple={true}
        style={{position: 'absolute', bottom: '10px', right: '10px', zIndex: '1000'}}
        zDepth={3}
      >
        <mui.FontIcon
          className="material-icons"
          color={this.getCurrentPallette().alternateTextColor}
        >home</mui.FontIcon>
      </mui.FloatingActionButton>
    )
  }
});

module.exports = CollectionHomeButton;
