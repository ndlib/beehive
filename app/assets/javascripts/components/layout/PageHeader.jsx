//app/assets/javascripts/components/layout/PageHeader.jsx
var React = require('react');

var PageHeader = React.createClass({
  displayName: 'Page Header',

  propTypes: {
    branding: React.PropTypes.bool,
  },

  render: function() {
    var titleBar = this.props.children;
    if (!titleBar) {
      titleBar = (
        <TitleBar />
      );
    }
    var branding;
    if(this.props.branding) {
      branding = (
        <BrandBar />
      );
    }

    return (
      <header id="banner" role="banner" className="home">
        <nav className="navbar navbar-default navbar-static-top" role="navigation">
          {branding}
          {titleBar}
        </nav>
      </header>
    );
  }
});

// each file will export exactly one component
module.exports = PageHeader;
