'use strict'
var React = require('react');
var mui = require('material-ui');
var MediaQuery = require('react-responsive');

var BrandBar = require('./BrandBar.jsx');
var CollectionLeftNav = require('./CollectionLeftNav.jsx');
var ConfigurationStore = require('../store/ConfigurationStore.js');
var ConfigurationActions = require('../actions/ConfigurationActions.js');
var SearchBox = require('./SearchBox.jsx');

var CollectionPageHeader = React.createClass({
  mixins: [
    require('../mixins/CollectionUrlMixin.jsx'),
    require('../mixins/CurrentThemeMixin.jsx')
  ],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    branding: React.PropTypes.bool,
  },

  getInitialState: function() {
    return {
      themeVariables: this.getCurrentTheme().appBar,
      configurationLoaded: ConfigurationStore.loaded(),
    }
  },

  componentDidMount: function() {
    ConfigurationStore.addChangeListener(this.configurationLoaded);
    if (!this.state.configurationLoaded) {
      ConfigurationActions.load(this.props.collection);
    }
  },

  configurationLoaded: function() {
    this.setState({ configurationLoaded: true });
  },

  largeScreenStyle: function() {
    var height = this.state.themeVariables.height + 1;
    if(this.props.branding) {
      height += 50;
    }
    return ({
      height: height + 'px',
      width: '100%',
      zIndex: "1000",
    });
  },

  smallScreenStyle: function() {
    return ({
      height: this.state.themeVariables.height + 1 + 'px',
      width: '100%',
      zIndex: "1000",
    });
  },


  titleStyle: function () {
    return {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      color: this.state.themeVariables.alternateTextColor,
      lineHeight: this.state.themeVariables.height + 'px',
    };
  },

  _handleTabs: function (tab) {
    if (tab.props.value == "about") {
      window.location.href = this.aboutUrl(this.props.collection);
    } else if (tab.props.value == "search") {
      window.location.href = this.browseUrl(this.props.collection);
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
    if (ConfigurationStore.browseEnabled()) {
      return (<mui.Tab label="Browse Collection" value="search" onActive={this._handleTabs} />);
    } else {
      return "";
    }
  },

  aboutTab: function() {
    if (ConfigurationStore.hasAboutPage()) {
      return (<mui.Tab label="About" value="about" onActive={this._handleTabs} />);
    } else {
      return "";
    }
  },

  availableTabs: function() {
    var ret = [];
    if (ConfigurationStore.browseEnabled()) {
      ret.push({label: "Browse Collection", value: "search"});
    }
    if (ConfigurationStore.hasAboutPage()) {
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
              return(<mui.Tab key={tab.value} label={tab.label} value={tab.value} onActive={this._handleTabs} style={{color:"white", width:'auto', padding:'0 20px 0 0', fontSize: '16px'}} />);
            }.bind(this))
          }
        </mui.Tabs>);
    }
    return (
      <mui.Tabs style={ {float:'right', backgroundColor: "none" } } value={this.activeTab()} tabItemContainerStyle={{backgroundColor: "transparent", width:"auto" }}>
      </mui.Tabs>
    );
  },

  appBarStyle: function() {
    var style = this.baseScreenStyle();

    if (this.props.branding) {
      style["top"] = "50px";
    }
    return style
  },

  baseScreenStyle: function() {
    return {
      position: "fixed",
      background: "linear-gradient(to bottom, #5b5b5b 0%,#050505 100%)",
      height:"45px"
    };
  },

  searchBox: function() {
    if (ConfigurationStore.searchEnabled()) {
      return (
        <div style={ {float:'right', marginTop:'-8px' } }>
          <SearchBox collection={this.props.collection} useStore={false}/>
        </div>
      );
    }
    return (<span />);
  },

  render: function() {
    var title = (
      <a style={{ textDecoration: "none", color: this.getCurrentPallette().alternateTextColor }}
        href={this.collectionUrl(this.props.collection)}>
          <h1 style={this.titleStyle()}>{this.props.collection.name_line_1}</h1>
      </a>
    );

    var rightNav = (
      <div style={{ marginRight: "16px" }}>
        {this.searchBox()}
        <MediaQuery minWidth={650}>
          {this.tabs()}
        </MediaQuery>
      </div>
    );

    return (
      <div>
        <MediaQuery maxWidth={650}>
          <mui.Paper circle={false} rounded={false} zDepth={0} style={this.smallScreenStyle()}>
          <mui.AppBar
            title={title}
            iconElementLeft={<CollectionLeftNav collection={this.props.collection} />}
            iconElementRight={rightNav}
            style={this.baseScreenStyle()}
          />
          <div id="whiteSpacer" style={{ width: "100%", backgroundColor: "white", position: "fixed", top: this.state.themeVariables.height + "px", height: "1px", zIndex: "1000" }} />
          {this.props.children}
          </mui.Paper>
        </MediaQuery>
        <MediaQuery minWidth={650}>
          <mui.Paper circle={false} rounded={false} zDepth={0} style={this.largeScreenStyle()}>
            <BrandBar />
            <mui.AppBar
              title={title}
              iconElementLeft={<CollectionLeftNav collection={this.props.collection} />}
              iconElementRight={rightNav}
              style={this.appBarStyle()}
            />
            <div id="whiteSpacer" style={{ width: "100%", backgroundColor: "white", position: "fixed", top: this.state.themeVariables.height + "px", height: "1px", zIndex: "1000" }} />
            {this.props.children}
          </mui.Paper>
        </MediaQuery>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
