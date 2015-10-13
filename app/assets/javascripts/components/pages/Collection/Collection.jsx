//app/assets/javascripts/components/CollectionShow.jsx
var React = require('react');

var Collection = React.createClass({
  mixins: [PageHeightMixin, LoadRemoteMixin],

  displayName: 'Collection Show Page',

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
    };
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

  setValues: function(collection) {
    this.setState({
      collection: collection,
    });
  },

  componentWillMount: function(){
    document.body.className = document.body.className + " collection";
  },

  render: function() {
    /*
    the search box that was hidden temporarily
    <div style={{backgroundColor: 'white', width:'100%', textAlign: 'center',}}>
      <div>
      <SearchBox collection={this.state.collection} />
      </div>
    </div>
    */
    return (
      <div>
        <div className="collection-show-page">
          <Layout>
            <CollectionPageHeader collection={this.state.collection} branding={true}/>
            <CollectionShow collection={this.state.collection} />
            <PageContent>
              <CollectionIntro collection={this.state.collection} />
              <CollectionShowShowcases collection={this.state.collection} />
            </PageContent>
            <CollectionPageFooter collection={this.state.collection} />
          </Layout>
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = Collection;
