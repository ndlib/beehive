'use strict'
var React = require('react');
var mui = require('material-ui');

var SiteIndex = React.createClass({
  mixins: [LoadRemoteMixin, MuiThemeMixin],

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
      this.loadRemoteCollection(this.props.collections)
    }
  },

  setValues: function(collections) {
    this.setState({
      collections: collections,
    });
  },

  componentWillMount: function(){
    document.body.className = document.body.className + " bee-light-theme collections-bg";
  },

  render: function() {
    return (
      <mui.AppCanvas>
        <BrandBar/>
        <PageContent fluidLayout={true}>
          <mui.Card  style={{height:'40vh', position:'relative', top:'50px', left:'0', right:'0'}} className="heightFix"  >
            <mui.CardMedia className="collectionscover"
              style={{height:'100%'}}
              overlayContentStyle={{background:'transparent', position:'static'}}
              overlay={<mui.CardTitle
                //Some of the styles for the banner display are in the .css file due to nesting complications
                title="Digital Collections"
                titleStyle={{height:'0', backgroundImage: 'url(' + '/assets/dec.logo.svg' + ')', backgroundSize:'cover', overflow:'hidden', position:'absolute', paddingTop:'132px', width:'400px', left:'60px;', top:'60px;'}}
                subtitle="Powered by HoneyComb"
                subtitleStyle={{height:'0', backgroundImage: 'url(' + '/assets/powered.png' + ')', backgroundSize:'cover', overflow:'hidden', position:'absolute', paddingTop:'57px', width:'200px', right:'60px', bottom:'60px'}}
              />}
              >
              <div className='coverImage'><img src="/assets/home.jpg"/></div>
            </mui.CardMedia>
          </mui.Card>
          <PageContent fluidLayout={false}>

            <h2>Featured Collections</h2>
            <CollectionsList collections={this.state.collections} />
          </PageContent>
        </PageContent>
        <IndexPageFooter />
      </mui.AppCanvas>
    );
  }

});

// each file will export exactly one component
module.exports = SiteIndex;
