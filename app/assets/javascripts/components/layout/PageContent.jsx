//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var PageHeader = React.createClass({
  render: function() {
    return (
      <div className="container-fluid content">
        <div className="row row-fluid">
          <div className="col-lg-12 showcase">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = PageHeader;
