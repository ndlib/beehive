//app/assets/javascripts/components/modal/Info.jsx
var React = require('react');

var Info = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },
  customInfoText: function () {
    if (this.props.collection.about) {
      return (
        <div className="about-collection">
          <div dangerouslySetInnerHTML={{__html: this.props.collection.about}} />
        </div>
      )
    }

    return ""
  },
  content: function() {
    return (
      <div>
        {this.customInfoText()}
        <p>Digital Exhibits and Collections is a service of the <a href="http://library.nd.edu" target="_blank">Hesburgh Libraries of Notre Dame</a>.</p>
        <p><a href="http://library.nd.edu/eresources/forms/problem/index.cgi?commentType=general&_ga=1.10232437.1587359587.1371157071#tab_cp" target="_blank">Questions and Comments</a></p>
      </div>
    );
  },
  render: function () {
    return <Modal id="info" content={this.content()} title="About Collection" />;
  }
});

module.exports = Info;
