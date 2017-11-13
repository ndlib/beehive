'use strict'
var React = require('react');
var mui = require('material-ui');
var Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER'
}
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var BeehiveTheme = require('../themes/beehive.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const CollectionUrl = require('../modules/CollectionUrl.jsx')
const CurrentTheme = require('../modules/CurrentTheme.jsx')

var CollectionLeftNav = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

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
      sitePath: [],
      muiTheme: ThemeManager.getMuiTheme(BeehiveTheme),
    };
  },

  componentWillMount: function() {
    if (this.props.collection['site_path']) {
      this.setState({
        sitePath: this.props.collection['site_path']
      });
    }
  },

  componentDidMount: function() {
    if (this.props.collection['site_path']) {
      return;
    }
    var url = this.props.collection['@id'] + '/site_path';

    $.ajax({
      context: this,
      type: "GET",
      url: url,
      dataType: "json",
      success: function(result) {
        this.setState({
          sitePath: result.site_path,
        });
      },
      error: function(request, status, thrownError) {
        // Should we redirect here? It's probably not necessary since it's not
        // the primary content of the page...
        //window.location = window.location.origin + '/404';
        console.log("Error retrieving showcase list " + thrownError);
      }
    });
  },


  menuItemAction: function(url) {
    window.location = url;
  },

  dropDownOptions: function() {
    var options = [];
    var collectionUrl = CollectionUrl.collectionUrl(this.props.collection);
    var aboutUrl = CollectionUrl.aboutUrl(this.props.collection);
    var introUrl = CollectionUrl.introUrl(this.props.collection);
    var browseUrl = CollectionUrl.browseUrl(this.props.collection);

    options.push((
      <a href={collectionUrl} key='collectionUrlLink'>
        <mui.MenuItem primaryText='Home' key='home' />
      </a>
    ));

    if (this.props.collection.enable_browse) {
      options.push((
        <a href={browseUrl} key='browseUrlLink'>
          <mui.MenuItem primaryText='Browse Collection' key='browse' />
        </a>
      ));
    }

    if (this.props.collection.about) {
      options.push((
        <a href={aboutUrl} key='aboutUrl'>
          <mui.MenuItem primaryText='About' key='about'/>
        </a>
      ));
    }
    options.push((<mui.Divider key="divider"/>));

    if (introUrl) {
      options.push((
        <a href={introUrl} key='introUrl'>
          <mui.MenuItem primaryText='Introduction' key='intro'/>
        </a>
      ));
    }

    this.state.sitePath.forEach(function(siteObject){
      var url = CollectionUrl.collectionObjectUrl(siteObject);
      var name = siteObject.name || siteObject.name_line_1;
      options.push ((
        <a href={url} key={url}>
          <mui.MenuItem primaryText={name} key={siteObject.id} className="collection-left-nav-item" />
        </a>
      ));
    }.bind(this));

    return options;
  },

  buttonStyle: function () {
    return ({
      paddingTop: '5px',
      paddingBottom: '5px',
      marginBottom: 0,
      height: 'auto',
      minWidth: 'auto',
      backgroundColor: 'rgba(255,255,255,.1)',
      color: 'white',
      zIndex: "5"
    });
  },

  navStyle: function () {
    return ({
      zIndex: '999999999999999'
    });
  },

  clickEvent: function () {
    this.refs.leftNav.toggle();
  },

  render: function () {
    if(!this.props.collection) {
      return;
    }
    else {
      return (
        <div id="CollectionLeftNav" style={{margin:'0', marginLeft: "16px"}}>
          <mui.FlatButton
            onClick={this.clickEvent}
            style={this.buttonStyle()}
            disableTouchRipple={true}
          >
            <mui.FontIcon className="material-icons" style={CurrentTheme.lightIconStyle()}>menu</mui.FontIcon>
          </mui.FlatButton>

          <mui.LeftNav
            ref="leftNav"
            className="leftNav"
            docked={false}
            children={this.dropDownOptions()}
            style={this.navStyle()} />
        </div>
      );
    }
  }
});

module.exports = CollectionLeftNav;
