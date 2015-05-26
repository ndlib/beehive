//app/assets/javascripts/components/Details.jsx
var React = require('react');

var ToggleTheme = React.createClass({

  getInitialState: function() {
    return {
      theme: '',
    };
  },

  toggleStyle: function () {
    var new_theme = ''
    if (this.state.theme == '') {
      new_theme = 'bee-light-theme';
      document.body.className = document.body.className + ' ' + new_theme;
    } else {
      document.body.className = document.body.className.replace('bee-light-theme', '');
    }

    this.setState({
      theme: new_theme
    });
  },

  render: function () {
    return (
      <a href="#" onClick={this.toggleStyle} className="btn">Toggle Theme</a>
    );
  }
});

module.exports = ToggleTheme;
