//app/assets/javascripts/components/layout/PageContent.jsx
var React = require('react');

var PageContent = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 bee-page-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = PageContent;
