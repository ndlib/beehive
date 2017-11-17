var React = require('react');
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var BeehiveTheme = require('../../themes/beehive.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx');
var PageContent = require('../../layout/PageContent.jsx');
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx');
var PagesShow = require('./PagesShow.jsx');
var PageTitleBar = require('./PageTitleBar.jsx');
var SitePathCard = require('../Collection/SitePathCard.jsx');
var PreviewLink = require('../../layout/PreviewLink.jsx');
var MediaQuery = require('react-responsive');
var ConfigurationActions = require("../../actions/ConfigurationActions.js");
var ConfigurationStore = require("../../store/ConfigurationStore.js");
var PageTitle = require('../../modules/PageTitle.js')

const LoadRemote = require('../../modules/LoadRemote.jsx')

var Page = React.createClass({
  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState: function() {
    return {
      titleHeight: 56,
      titleSectionPercentVisible: 0,
      collection: {},
      remoteCollectionLoaded: false,
      muiTheme: ThemeManager.getMuiTheme(BeehiveTheme),
    };
  },

  componentDidMount: function() {
    ConfigurationStore.addChangeListener(this.configurationLoaded);
    if ('object' == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      LoadRemote.loadRemoteCollection(this.props.collection, this.setValues.bind(this));
    }
  },

  componentWillUnmount: function() {
    ConfigurationStore.removeChangeListener(this.configurationLoaded);
  },

  // Callback from loadRemoteCollection
  setValues: function(result){
    ConfigurationActions.load(result);
    if(result.pages.items) {
      this.linkItems(result.pages.items);
    }
    this.setState({
      remoteCollectionLoaded: true,
      collection: result,
    });
    return true;
  },

  configurationLoaded: function(){
    this.setState({ configurationLoaded: true });
  },

  // Creates doubly linked list from items to make subsequent
  // item navigation operations easier/faster
  linkItems: function(items) {
    items.forEach(function(item, i, array) {
      var nextI = i + 1;
      var prevI = i - 1;
      if(nextI < array.length) {
        item.nextItem = array[nextI];
      }
      if(prevI >= 0) {
        item.previousItem = array[prevI];
      }
    });
  },

  contentMouseOver: function(event) {
    var item = this.getItemFromEvent(event);
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
      nextCard = [
        <div style={{ clear: "both" }}>
          <hr />
          <MediaQuery minWidth={1000}>
            <div style={{margin: '0 auto', maxWidth: '500px' }}>
              <SitePathCard
                headerTitle="Continue to"
                siteObject={this.state.collection.pages.nextObject}
                addNextButton={true}
                fixedSize={false}
              />
            </div>
          </MediaQuery>,
          <MediaQuery maxWidth={1000}>
            <div style={{margin: '0 0', maxWidth: '500px' }}>
              <SitePathCard
                headerTitle="Continue to"
                siteObject={this.state.collection.pages.nextObject}
                addNextButton={true}
                fixedSize={false}
              />
            </div>
          </MediaQuery>
        </div>
      ];
    }
    return nextCard;
  },

  previewCard: function() {
    if(this.state.collection.pages.nextObject) {
      return (<PreviewLink siteObject={this.state.collection.pages.nextObject}/>);
    }
    return null;
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
    PageTitle(this.state.collection.name)
    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} branding={false} />
        <PageTitleBar title={this.state.collection.pages.name} height={this.state.titleHeight} />
          <PageContent onClick={this.contentClicked} onMouseOver={this.contentMouseOver}>
            <PagesShow content={this.pageContent()}>
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
