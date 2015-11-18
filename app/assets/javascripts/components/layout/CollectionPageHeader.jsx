'use strict'
var React = require('react');
var mui = require('material-ui');
var CollectionLeftNav = require('./CollectionLeftNav');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin, TitleConcatMixin, CurrentThemeMixin],

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

  titleStyle: function () {
    var themeVariables = this.getCurrentTheme().appBar;

    return {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      color: themeVariables.alternateTextColor,
      lineHeight: themeVariables.height + 'px',
    };
  },

  _handleTabs: function (tab) {
    if (tab.props.value == "search") {
      window.location.href = this.browseUrl(this.props.collection);
    } else {

    }
  },

  activeTab: function() {
    var pageCode = window.location.pathname.split("/").slice(-1)[0].split("?")[0];

    if (pageCode == "search") {
      return "search";
    } else if (window.location.pathname == this.browseUrl(this.props.collection)) {
      return "about";
    }
    return "none";
  },

  browseTab: function() {
    if (this.props.collection.enableBrowse) {
      return (<mui.Tab label="Browse Collection" value="search" onActive={this._handleTabs} />);
    } else {
      return "";
    }
  },

  aboutTab: function() {
    if (this.props.collection.about) {
      return (<mui.Tab label="About" value="about" onActive={this._handleTabs} />);
    } else {
      return "";
    }
  },

  availableTabs: function() {
    var ret = [];
    if (this.props.collection.enable_browse) {
      ret.push({label: "Browse Collection", value: "search"});
    }
    if (this.props.collection.about) {
      ret.push({label: "About", value: "about"});
    }
    return ret;
  },

  tabs: function() {
    var availableTabs = this.availableTabs();
    if (availableTabs.length > 0) {
      return  (
        <mui.Tabs style={ {float:'right', backgroundColor: "none" } } value={this.activeTab()} tabItemContainerStyle={{backgroundColor: "transparent", width:"auto" }}>
          {
            availableTabs.map(function (tab, index) {
              return(<mui.Tab label={tab.label} value={tab.value} onActive={this._handleTabs} style={{color:"white", width:'auto', padding:'0 20px 0 0', fontSize: '16px'}} />);
            }.bind(this))
          }
        </mui.Tabs>);
    }
    return "";
  },

  appBarStyle: function() {
    var style = {
      position: "fixed",
      //background: "rgba(0, 0, 0, 0.86)",
      background: "linear-gradient(to bottom, #5b5b5b 0%,#050505 100%)",

    };

    if (this.props.branding) {
      style["top"] = "50px";
    }

    return style
  },

  render: function() {
    var title = (
      <a style={{ textDecoration: "none", color: this.getCurrentPallette().alternateTextColor }}
        href={this.collectionUrl(this.props.collection)}>
          <h1 style={this.titleStyle()}>{this.props.collection.name_line_1}</h1>
      </a>
    );

    var rightNav = (
      <div>
        <div style={ {float:'right', marginTop:'-8px' } }>
          <SearchBox collection={this.props.collection} />
        </div>

        {this.tabs()}
      </div>
    );

    return (
      <mui.Paper circle={false} rounded={false} zDepth={0} style={this.style()}>
        {this.brandBar()}
        <mui.AppBar
          title={title}
          iconElementLeft={<CollectionLeftNav collection={this.props.collection} />}
          iconElementRight={rightNav}
          style={this.appBarStyle()}
        />
      </mui.Paper>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
