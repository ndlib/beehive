var React = require('react');
var mui = require('material-ui');

var PagesShow = React.createClass({
  mixins: [LoadRemoteMixin, MuiThemeMixin],

  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.object,
  },

  render: function() {
    var pageContent = (<Loading/>);
    var pageName;
    if(this.state.collection && this.state.collection.pages) {
      pageName = this.state.collection.pages.name;
      pageContent = (
        <EssayContent content={this.state.collection.pages.content} />
      )
    }

    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.props.content}
      </div>
    )
  }
});

module.exports = PagesShow;
