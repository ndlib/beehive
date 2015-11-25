'use strict'
var React = require('react');
var mui = require('material-ui');

var EssayContent = React.createClass({

  propTypes: {
    content: React.PropTypes.string.isRequired,
  },

  styles: function () {
    return {
      fontSize: '20px',
    };
  },

  render: function () {
    return (<div className="essay-content" dangerouslySetInnerHTML={{__html:this.props.content}} />);
  }
});

module.exports = EssayContent;
