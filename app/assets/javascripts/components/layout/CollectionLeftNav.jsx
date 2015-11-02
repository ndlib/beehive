'use strict'
var React = require('react');
var mui = require('material-ui');

var CollectionLeftNav = React.createClass({
  mixins: [ CollectionUrlMixin, CurrentThemeMixin ],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      showcases: [],
    };
  },

  componentDidUpdate: function() {
    if(!this.props.collection['@id'] || this.state.showcases.length > 0) {
      return [];
    }
    var url = this.props.collection['@id'] + '/showcases';
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      var showcases = JSON.parse(request.response).showcases;
      if (this.isMounted()) {
        this.setState({
          showcases: showcases,
        });
      }
    }.bind(this);

    request.send();
  },

  dropDownOptions: function() {
    var options = [];
    var collectionUrl = this.collectionUrl(this.props.collection);
    var introUrl = this.introUrl(this.props.collection);

    options.push((
      {
        type: mui.MenuItem.Types.LINK,
        payload: collectionUrl,
        text: 'Home'
      }
    ));

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
