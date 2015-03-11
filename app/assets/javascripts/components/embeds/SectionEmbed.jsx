//app/assets/javascripts/components/SectionEmbed.jsx
var React = require('react');

var SectionEmbed = React.createClass({
  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    params: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      collection: {},
      showcase: null,
      section: null
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection()
    }
  },

  loadRemoteCollection: function() {
    $.get(this.props.collection, function(result) {
      this.setValues(result);
    }.bind(this));
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
      showcase: collection.showcases,
      section: collection.showcases.sections,
      params: this.props.params,
    });
  },

  render: function() {
    if (this.state.section != null) {
      return (
        <div className="section">
          <h2>{this.state.section.title}</h2>
          <SectionImage section={this.state.section} />
          <p dangerouslySetInnerHTML={{__html: this.state.section.description}} />
        </div>
      );
    }
    else {
      return (<Loading />);
    }
  }
});

// each file will export exactly one component
module.exports = SectionEmbed;
