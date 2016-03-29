'use strict'
var React = require('react');
var mui = require('material-ui');

var Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER'
}

var CollectionLeftNav = React.createClass({
  mixins: [
    require('../mixins/CollectionUrlMixin.jsx'),
    require('../mixins/CurrentThemeMixin.jsx'),
    require('../mixins/MuiThemeMixin.jsx') ],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      sitePath: [],
    };
  },

  componentDidMount: function() {
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
    var collectionUrl = this.collectionUrl(this.props.collection);
    var aboutUrl = this.aboutUrl(this.props.collection);
    var introUrl = this.introUrl(this.props.collection);
    var browseUrl = this.browseUrl(this.props.collection);

    options.push((
      <mui.MenuItem onTouchTap={() => {this.menuItemAction(collectionUrl)}} primaryText='Home' key='home' />
    ));

    if (this.props.collection.enable_browse) {
      options.push((
        <mui.MenuItem onTouchTap={() => {this.menuItemAction(browseUrl)}} primaryText='Browse Collection' key='browse' />
      ));
    }

    if (this.props.collection.about) {
      options.push((
        <mui.MenuItem onTouchTap={() => {this.menuItemAction(aboutUrl)}} primaryText='About' key='about'/>
      ));
    }
    options.push((<mui.Divider key="divider"/>));

    if (introUrl) {
      options.push((
        <mui.MenuItem onTouchTap={() => {this.menuItemAction(introUrl)}} primaryText='Introduction' key='intro'/>
      ));
    }

    this.state.sitePath.forEach(function(siteObject){
      var url = this.collectionObjectUrl(siteObject);
      var name = siteObject.name || siteObject.name_line_1;
      options.push ((
        <mui.MenuItem onTouchTap={() => {this.menuItemAction(url)}} primaryText={name} key={siteObject.id} className="collection-left-nav-item" />
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
            <mui.FontIcon className="material-icons" style={this.lightIconStyle()}>menu</mui.FontIcon>
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
