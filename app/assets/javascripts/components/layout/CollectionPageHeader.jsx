'use strict'
var React = require('react');
var mui = require('material-ui');
var CollectionLeftNav = require('./CollectionLeftNav');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin, TitleConcatMixin, MuiThemeMixin],

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
      height: (this.props.branding ? '100px' : '50px'),
      width: '100%',
    });
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

        <mui.Tabs style={ {float:'right' } }>
          <mui.Tab label="Item One" >
          </mui.Tab>
          <mui.Tab label="Item Two" >

          </mui.Tab>
          <mui.Tab
            label="Item Three"
            route="home"
            onActive={this._handleTabActive} />
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
