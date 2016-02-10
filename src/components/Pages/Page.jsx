var React = require('react');
var mui = require('material-ui');

var OverlayPage = require("../../layout/OverlayPage.jsx");
var ItemShow = require('../../display/ItemShow.jsx');

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

  closeItem: function () {
    this.setState({ item: null });
  },

  contentClicked: function(event) {
    var item = getItemFromEvent(event);
    if(item) {
        this.setState({item: item });
      }
    }
  },

  contentMouseOver: function(event) {
    var item = getItemFromEvent(event);
    if(item) {
      event.target.style.cursor = "pointer";
    }
  },

  getItemFromEvent: function(event) {
    var item;
    var itemId = event.target.getAttribute("item_id");
    if(itemId && this.state.collection.pages.items) {
      item = this.state.collection.pages.items.find(function(e, i, a) {
        return e["id"] == itemId;
      });
    }
    return item;
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

  renderItem: function() {
    if(this.state.item) {
      return(
        <OverlayPage title={this.state.item.name} onCloseButtonClick={this.closeItem}>
          <ItemShow item={this.state.item} onClose={this.closeItem}/>
        </OverlayPage>
      );
    }
  },

  pageContent: function() {
    var pageContent = (<div/>);
    if(this.state.collection && this.state.collection.pages) {
      return (this.state.collection.pages.content);
    } else {
      return (<div/>);
    }
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded) {
      return null;
    }

    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} branding={true}/>
          { this.renderItem() }
          <PageContent onClick={this.contentClicked} onMouseOver={this.contentMouseOver}>
            <PagesShow title={this.state.collection.pages.name} content={this.pageContent()}>
              { this.nextCard() }
              { this.previewCard() }
            </PagesShow>
          </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    )
  }
});

module.exports = Page;
