//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var PageHeader = React.createClass({
  render: function() {
    var titleBar = this.props.children;
    if (!titleBar) {
      titleBar = (
        <TitleBar />
      );
    }
    return (
      <header id="banner" role="banner" className="home">
        <nav className="navbar navbar-default navbar-static-top" role="navigation">
          <div className="brand-bar">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <a href="http://www.nd.edu">University <i>of</i> Notre Dame</a>
                </div>
                <div className="col-sm-6">
                  <a className="pull-right" href="http://library.nd.edu">Hesburgh Libraries</a>
                </div>
              </div>
            </div>
          </div>
          {titleBar}
        </nav>
      </header>
    );
  }
});

// each file will export exactly one component
module.exports = PageHeader;
