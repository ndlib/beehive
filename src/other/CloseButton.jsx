"use strict"
var React = require("react");
var mui = require("material-ui");
import { Link } from 'react-router'

var SearchStore = require('../store/SearchStore.js')

const CurrentTheme = require('../modules/CurrentTheme.jsx')
const CollectionUrl = require('../modules/CollectionUrl.jsx')

var CloseButton = React.createClass({
  propTypes: {
    href: React.PropTypes.string,
    alternate: React.PropTypes.bool,
    height: React.PropTypes.number
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      alternate: false,
      height: 35,
    }
  },

  color: function() {
    if (this.props.alternate) {
      return CurrentTheme.getCurrentPallette(this.context.muiTheme).alternateTextColor;
    } else {
      return CurrentTheme.getCurrentPallette(this.context.muiTheme).textColor;
    }
  },

  iconStyle: function() {
    return { border:'solid 1px', verticalAlign: "middle", width: "initial", height: "initial" };
  },

  // generate what the back location url is
  href: function() {
    if (this.props.href) {
      return this.props.href
    }

    // go back to the search page if we have search information in the store
    if (SearchStore.collection) {
      return {
        pathname: SearchStore.searchPath(),
        query: SearchStore.searchQuery(),
      }
    }

    let current = window.location.pathname
    let stopword

    // this should bring us up 1 level. eg section=>showcase showcase=>collection
    if (current.includes("/items/")) {
      stopword = 'items'
    } else if (current.includes('/pages/')) {
      stopword = 'pages'
    } else if (current.includes('/sections/')) {
      stopword = 'sections'
    } else if (current.includes('/showcases/')) {
      stopword = 'showcases'
    } else {
      return '/'
    }

    let re = RegExp(`((?:\/[^\/]+)+)\/${stopword}`)
    return re.exec(current)[1]
  },

  render: function() {
    return (
      <Link to={this.href()}>
        <mui.EnhancedButton
          disableTouchRipple={true}
          style={{ height: "100%", padding: 0 }}
        >
          <mui.FontIcon className="material-icons" color={this.color()} style={this.iconStyle()}>clear</mui.FontIcon>
        </mui.EnhancedButton>
      </Link>
    );
  },
});

module.exports = CloseButton;
