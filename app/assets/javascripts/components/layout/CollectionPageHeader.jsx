'use strict'
var React = require('react');
var mui = require('material-ui');
var CollectionLeftNav = require('./CollectionLeftNav');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin, TitleConcatMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    branding: React.PropTypes.bool,
  },

  brandBar: function () {
    if (this.props.branding) {
      return (<BrandBar />);
    } else {
      return (<span />)
    }
  },

  style: function () {
    return ({
      height: (this.props.branding ? '115px' : '65px'),
      width: '100%',
      zIndex: "1000",
    });
  },

  _handleSearchTab: function () {
    window.location.href = this.browseUrl(this.props.collection);
  },

  render: function() {
    var title = (
      this.props.collection.name_line_1
    );

    var rightNav = (
      <div>
        <div style={ {float:'right' } }>
          <SearchBox collection={this.props.collection} />
        </div>

        <mui.Tabs style={ {float:'right'} }>
          <mui.Tab label="Browse Collection" route="browse" onActive={this._handleSearchTab} >
          </mui.Tab>
          <mui.Tab label="About" payload="/about" onActive={this._handleSearchTab} >
          </mui.Tab>
          <mui.Tab
            label="Item Three"
            route="search" />
        </mui.Tabs>
      </div>
    );
    return (
      <mui.Paper circle={false} rounded={false} zDepth={0} style={this.style()}>
        {this.brandBar()}
        <mui.AppBar
          title={title}
          iconElementLeft={<CollectionLeftNav collection={this.props.collection} />}
          iconElementRight={rightNav}
        />
      </mui.Paper>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
