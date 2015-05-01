//app/assets/javascripts/components/CollectionsList.jsx
var React = require('react');

var CollectionsListPage = React.createClass({
  displayName: 'Collections List Page',

  propTypes: {
    collections: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
  },

  getInitialState: function() {
    return {
      collections: [],
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collections)) {
      this.setState({
        collections: this.props.collections,
      });
    } else {
      this.loadRemoteCollection()
    }
  },

  loadRemoteCollection: function() {
    $.get(this.props.collections, function(result) {
      this.setState({
        collections: result,
      });
    }.bind(this));
  },

  componentWillMount: function(){
    document.body.className = "collections-bg";
  },

  render: function() {
    return (
      <Layout>
        <PageHeader />
        <PageContent>
          <div className="banner">
            <div className="container">
              <h1>Digital Collections</h1>
              <h3>Powered by HoneyComb</h3>
              <p>Ubi probant non excepteur. Pariatur illustriora iis vidisse, fabulas ut anim,
                arbitror noster labore hic esse est aute e incurreret. Non ad velit ipsum culpa.
                Qui iis domesticarum eu varias laboris cohaerescant, an labore id quid ex ne
                eiusmod concursionibus, ad commodo adipisicing se quamquam quis quae nostrud
                quis sed ex ab exercitation o arbitror sunt si arbitror eruditionem. Quo minim
                illum ubi excepteur. Officia quo labore offendit e tempor efflorescere iis
                quamquam. Eiusmod nisi ingeniis possumus, singulis quorum admodum.</p>
            </div>
          </div>
          <CollectionsList collections={this.state.collections} />
        </PageContent>
      </Layout>
    );
  }

});

// each file will export exactly one component
module.exports = CollectionsListPage;
