var React = require('react');
var mui = require('material-ui');

var PagesShow = React.createClass({
  mixins: [LoadRemoteMixin, MuiThemeMixin],

  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]).isRequired,
  },

  render: function() {
    var pageName;
    var pageContent = (<Loading/>);
    if(this.props.title) {
      pageName = (<h2>{this.props.title}</h2>);
    }
    if(this.props.content) {
      pageContent = (
        <div className="essay-content" dangerouslySetInnerHTML={{__html:this.props.content}} />
      );
    }

    return (
      <div>
        {pageName}
        {pageContent}
      </div>
    )
  }
});

module.exports = PagesShow;
