'use strict'
var React = require('react');
var mui = require('material-ui');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin, TitleConcatMixin, MuiThemeMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    branding: React.PropTypes.bool,
    dropdown: React.PropTypes.bool,
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
      height: (this.props.branding ? '100px' : '50px'),
      width: '100%',
    });
  },

  render: function() {
    var dropdown = "";
    if(this.props.collection['@id'] && this.props.dropdown) {
      dropdown = (<ShowcaseDropDown collection={this.props.collection} />);
    }

    var title = (
      <a className="navbar-brand overflow-ellipsis" href={this.collectionUrl(this.props.collection)}>
        {this.props.collection.name_line_1}
      </a>
    );

    return (
      <mui.Paper circle={false} rounded={false} zDepth={0} style={this.style()}>
        {this.brandBar()}
        <div style={{width: '100%'}}>
          {title}
          <div style={{ position: 'absolute', right: '60px' }}>
            <mui.Tabs style={ {width: '300px' }}>
              <mui.Tab label="Item One" >
              </mui.Tab>
              <mui.Tab label="Item Two" >

              </mui.Tab>
              <mui.Tab
                label="Item Three"
                route="home"
                onActive={this._handleTabActive} />
            </mui.Tabs>
          </div>
        </div>
      </mui.Paper>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
