var React = require('react');
var mui = require('material-ui');

var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx');
var PageContent = require('../../layout/PageContent.jsx');
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx');
var PagesShow = require('./PagesShow.jsx');
var SitePathCard = require('../Collection/SitePathCard.jsx');
var PreviewLink = require('../../layout/PreviewLink.jsx')

var Page = React.createClass({
  mixins: [
    require("../../mixins/LoadRemoteMixin.jsx"),
    require("../../mixins/MuiThemeMixin.jsx")
  ],

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
  },

  nextCard: function() {
    var nextCard = null;
    if(this.state.collection.pages.nextObject) {
      nextCard = (
        <div style={{margin: '0 auto', maxWidth: '500px'}}>
          <SitePathCard
            headerTitle="Continue to"
            siteObject={this.state.collection.pages.nextObject}
            addNextButton={true}
            fixedSize={false}
          />
        </div>
      );
    }
    return nextCard;
  },

  previewCard: function() {
    if(this.state.collection.pages.nextObject) {
      return (<PreviewLink siteObject={this.state.collection.pages.nextObject}/>);
    }
    return null;
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded) {
      return null;
    }

    var pageContent = (<div/>);
    var pageName;
    if(this.state.collection && this.state.collection.pages) {
      pageName = this.state.collection.pages.name;
      pageContent = this.state.collection.pages.content;
    }

    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} branding={true}/>
          <PageContent>
            <PagesShow title={pageName} content={pageContent} />
            { this.nextCard() }
            { this.previewCard() }
          </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    )
  }
});

module.exports = Page;
