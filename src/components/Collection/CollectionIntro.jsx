var React = require('react');

var mui = require("material-ui");
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var BeehiveTheme = require('../../themes/beehive.jsx');

var CollectionIntro = React.createClass({
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
      muiTheme: ThemeManager.getMuiTheme(BeehiveTheme),
    };
  },

  style: function () {
    return ({
      margin:'60px 0',
    });
  },

  render: function() {
    if(this.props.collection) {
      return (
        <div className="essay-content" style={this.style()} dangerouslySetInnerHTML={{__html:this.props.collection.short_description}} />
      );
    }
  }
});

module.exports = CollectionIntro;
