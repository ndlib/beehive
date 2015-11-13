'use strict'
var React = require('react');
var mui = require('material-ui');
var CollectionLeftNav = require('./CollectionLeftNav');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin, TitleConcatMixin, CurrentThemeMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    branding: React.PropTypes.bool,
  },

  brandBar: function () {
    if (this.props.branding) {
      return (<BrandBar />);
    } else {
      return (<span />)
    }
  },

  style: function () {
    return ({
      height: (this.props.branding ? '115px' : '65px'),
      width: '100%',
      zIndex: "1000",
    });
  },

  titleStyle: function () {
    var themeVariables = this.getCurrentTheme().appBar;

    return {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      color: themeVariables.alternateTextColor,
      lineHeight: themeVariables.height + 'px',
    };
  },

  _handleTabs: function (tab) {
    if (tab.props.value == "browse") {
      window.location.href = this.browseUrl(this.props.collection);
    } else {

    }
  },

  render: function() {
    var title = (
      <a style={{ textDecoration: "none", color: this.getCurrentPallette().alternateTextColor }}
        href={this.collectionUrl(this.props.collection)}>
          <h1 style={this.titleStyle()}>{this.props.collection.name_line_1}</h1>
      </a>
    );

    var rightNav = (
      <div>
        <div style={ {float:'right' } }>
          <SearchBox collection={this.props.collection} />
        </div>

        <mui.Tabs style={ {float:'right', backgroundColor: "none" } } value="none" tabItemContainerStyle={{backgroundColor: "transparent", width:"auto" }}>
          <mui.Tab label="Browse Collection" value="browse" onActive={this._handleTabs} className="browse" style={{color:"white", width:'auto', padding:'0 20px 0 0', fontSize: '16px'}}/>
          <mui.Tab label="About" value="about" onActive={this._handleTabs}   style={{color:"white", width:'auto', padding:'0 20px 0 0', fontSize: '16px'}}/>
        </mui.Tabs>
      </div>
    );
    return (
      <mui.Paper circle={false} rounded={false} zDepth={0} style={this.style()}>
        {this.brandBar()}
        <mui.AppBar
          title={title}
          iconElementLeft={<CollectionLeftNav collection={this.props.collection} />}
          iconElementRight={rightNav}
        />
      </mui.Paper>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
