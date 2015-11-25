'use strict'
var React = require('react');
var mui = require('material-ui');

var CollectionLeftNav = React.createClass({
  // MuiThemeMixin to fix overwrites to the base style that we don't want on this page.
  mixins: [ CollectionUrlMixin, CurrentThemeMixin, MuiThemeMixin ],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      showcases: [],
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var url = nextProps.collection['@id'] + '/showcases';
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      dataType: "json",
      success: function(result) {
        var showcases = result.showcases;
        this.setState({
          showcases: showcases,
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

  dropDownOptions: function() {
    var options = [];
    var collectionUrl = this.collectionUrl(this.props.collection);
    var aboutUrl = this.aboutUrl(this.props.collection);
    var introUrl = this.introUrl(this.props.collection);
    var browseUrl = this.browseUrl(this.props.collection);

    options.push((
      {
        type: mui.MenuItem.Types.LINK,
        payload: collectionUrl,
        text: 'Home'
      }
    ));

    if (this.props.collection.enable_browse) {
      options.push((
        {
          type: mui.MenuItem.Types.LINK,
          payload: browseUrl,
          text: 'Browse Collection'
        }
      ));
    }

    if (this.props.collection.about) {
      options.push((
        {
          type: mui.MenuItem.Types.LINK,
          payload: aboutUrl,
          text: "About"
        }
      ));
    }

    options.push((
      { type: mui.MenuItem.Types.SUBHEADER, text: 'Showcases' }
    ));

    if (introUrl) {
      options.push((
        {
          type: mui.MenuItem.Types.LINK,
          payload: introUrl,
          text: 'Introduction'
        }
      ));
    }

    this.state.showcases.forEach(function(showcase){
      var url = collectionUrl + "/showcases/" + encodeURIComponent(showcase.id) + "/" + encodeURIComponent(showcase.slug);
      var showcaseName = showcase.name_line_1;
      options.push ((
        {
          type: mui.MenuItem.Types.LINK,
          payload: url,
          text: showcaseName
        }
      ));
    }.bind(this));

    return options;
  },

  buttonStyle: function () {
    return ({
      paddingTop: '5px',
      paddingBottom: '5px',
      marginBottom: 0,
      height: '35px',
      minWidth: 'auto',
      backgroundColor: 'transparent',
      color: 'white',
      zIndex: "1000000"
    });
  },

  navStyle: function () {
    return ({
    });
  },

  clickEvent: function () {
    this.refs.leftNav.toggle();
  },

  render: function () {
    return (
      <div>
        <mui.FlatButton onClick={this.clickEvent} style={this.buttonStyle()}>
          <mui.FontIcon className="material-icons" style={this.lightIconStyle()}>menu</mui.FontIcon>
        </mui.FlatButton>

        <mui.LeftNav
          ref="leftNav"
          docked={false}
          menuItems={this.dropDownOptions()}
          style={this.navStyle()} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionLeftNav;
