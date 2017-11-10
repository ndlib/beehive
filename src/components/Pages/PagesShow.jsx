var React = require('react');
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var BeehiveTheme = require('../../themes/beehive.jsx');

var MediaQuery = require('react-responsive');

var PagesShow = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]).isRequired,
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

  headerStyle: function() {
    return {
      maxWidth: "80%",
      margin: "36px auto 36px",
      textAlign: "center",
    }
  },

  contentStyle: function(media) {
    var style = {
      fontSize: "16px",
      maxWidth: "32.5em", // Should put it between 70-75 characters at 1em (16px)
      margin: "0 auto 60px",
    };
    if(media == "narrow") {
      style.margin = "0 0"
    }
    return style;
  },

  paperStyle: function(media) {
    switch(media) {
      case "wide":
      case "medium":
        return {
          width: "70%",
          margin: "0 auto",
          padding: "2rem"
        };
      case "narrow":
        return {
          width: "100%",
          margin: "0 0",
          padding: "2rem"
        };
    }
  },

  depth: function(media) {
    if (media == "wide") {
        return 1;
    }
    return 0;
  },

  getPaper: function(media) {
    var pageName;
    if(this.props.title) {
      pageName = (<h2 style={this.headerStyle()} >{this.props.title}</h2>);
    }
    return (
      <mui.Paper className="essay-content" zDepth={this.depth(media)} style={this.paperStyle(media)}>
        {pageName}
        <div style={this.contentStyle(media)} dangerouslySetInnerHTML={{__html:this.props.content}} />
        {this.props.children}
      </mui.Paper>
    );
  },

  render: function() {
    return (
      <div>
        <MediaQuery minWidth={1400}>
          {this.getPaper("wide")}
        </MediaQuery>
        <MediaQuery minWidth={1000} maxWidth={1400}>
          {this.getPaper("medium")}
        </MediaQuery>
        <MediaQuery maxWidth={1000}>
          {this.getPaper("narrow")}
        </MediaQuery>
      </div>
    )
  }
});

module.exports = PagesShow;
