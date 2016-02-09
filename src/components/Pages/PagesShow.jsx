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
      maxWidth: "37em", // Should put it between 70-75 characters at 1em (16px)
      margin: "0 auto",
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
      <div className="essay-content">
        {pageName}
        {pageContent}
      </div>
    )
  }
});

module.exports = PagesShow;
