//app/assets/javascripts/components/ShowcaseEditorTitle.jsx
var React = require('react');

var converter = new Showdown.converter()

var ShowcaseEditorTitle = React.createClass({
  propTypes: {
    showcase: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      border: '1px solid lightgrey',
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      padding: '5px',
      height: '100%',
      marginRight: '10px',
    };
  },

  editTitle: function() {
    window.location = this.props.showcase.editUrl;
  },

  render: function() {
    var description;
    if (this.props.showcase.description) {
      description = this.props.showcase.description.toString();
    }

    return (
      <div className="showcase-title-page" style={this.style()}>
        <h2>{this.props.showcase.title}</h2>
        <div  dangerouslySetInnerHTML={{__html: description}}  />
        <Thumbnail image={this.props.showcase.image} thumbnailType="small" />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseEditorTitle;
