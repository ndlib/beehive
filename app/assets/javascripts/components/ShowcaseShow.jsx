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
    console.log(this.state);
    if (this.state.showcase) {
      return (
        <div>
          <h2>Showcase</h2>
          <div>{this.state.showcase.id}</div>
          <div>{this.state.showcase.slug}</div>
          <div>{this.state.showcase.title}</div>
          <div dangerouslySetInnerHTML={{__html: this.state.showcase.description}} />
          <Thumbnail image={this.state.showcase.image} thumbnailType="small" />
          <div>{this.props.showcasesUrl}</div>
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }

  }

});

// each file will export exactly one component
module.exports = ShowcaseShow;
