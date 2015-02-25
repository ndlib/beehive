//app/assets/javascripts/components/ShowcaseShow.jsx
var React = require('react');

var ShowcaseShow = React.createClass({
  displayName: 'Showcase Show',
  propTypes: {
    showcasesUrl: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      showcase: null,
    };
  },
  componentDidMount: function() {
    $.get(this.props.showcasesUrl, function(result) {
      this.setState({
        showcase: result.showcases,
      })
    }.bind(this));
  },

  render: function() {
    if (this.state.showcase) {
      return (
        <div className="section">
          <h2>{this.state.showcase.title}</h2>
          <div dangerouslySetInnerHTML={{__html: this.state.showcase.description}} />
          <Thumbnail image={this.state.showcase.image} thumbnailType="small" />
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }

  }

});

// each file will export exactly one component
module.exports = ShowcaseShow;
