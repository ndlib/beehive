//app/assets/javascripts/components/modal/Copyright.jsx
var React = require('react');

var Copyright = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },
  year: function () {
    return (new Date().getFullYear());
  },
  content: function() {
    if (this.props.collection.copyright) {
      return(<div dangerouslySetInnerHTML={{__html: this.props.collection.copyright}} />);
    }
    return (<p><a href="http://www.nd.edu/copyright/">Copyright</a> {this.year()} <a href="http://www.nd.edu">University of Notre Dame</a></p>);
  },
  render: function () {
    return (
      <Modal id="copy" content={this.content()} />
    );
  }
});

module.exports = Copyright;
