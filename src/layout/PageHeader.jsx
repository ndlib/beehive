'use stirct'
var React = require('react');

var TitleBar = require('../layout/TitleBar.jsx');
var PageHeader = React.createClass({
  displayName: 'Page Header',

  propTypes: {
    branding: React.PropTypes.bool,
  },

  style: function() {
    return {
      width: "100%",
    };
  },

  render: function() {
    var titleBar = this.props.children;
    if (!titleBar) {
      titleBar = (
        <TitleBar />
      );
    }
    return (
      <div id="banner-wrapper">
        <header id="banner" role="banner" className="home" style={this.style()} >
          <nav className="" role="navigation" >
            {titleBar}
          </nav>
        </header>
      </div>
    );
  }
});

module.exports = PageHeader;
