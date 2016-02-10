var React = require('react');
var mui = require('material-ui');

var PagesShow = React.createClass({
  mixins: [
    require("../../mixins/LoadRemoteMixin.jsx"),
    require("../../mixins/MuiThemeMixin.jsx")
  ],

  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]).isRequired,
  },

  headerStyle: function() {
    return {
      maxWidth: "80%",
      margin: "36px auto 36px",
      textAlign: "center",
    }
  },

  contentStyle: function() {
    return {
      fontSize: "16px",
      maxWidth: "32.5em", // Should put it between 70-75 characters at 1em (16px)
      margin: "0 auto",
    }
  },

  paperStyle: function() {
    return {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "2rem"
    }
  },

  render: function() {
    var pageName;
    var pageContent = (<div className="essay-content" />);
    if(this.props.title) {
      pageName = (<h2 style={this.headerStyle()} >{this.props.title}</h2>);
    }
    if(this.props.content) {
      pageContent = (
        <div style={this.contentStyle()} dangerouslySetInnerHTML={{__html:this.props.content}} />
      );
    }

    return (
      <mui.Paper className="essay-content" zDepth={1} style={this.paperStyle()}>
        {pageName}
        {pageContent}
        {this.props.children}
      </mui.Paper>
    )
  }
});

module.exports = PagesShow;
