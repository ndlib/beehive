var React = require('react');
var mui = require('material-ui');

var SitePathCard = require('../Collection/SitePathCard.jsx');
var PagesShow = require('../Pages/PagesShow.jsx');

var CollectionDescription = React.createClass({
  mixins: [
    require("../../mixins/MuiThemeMixin.jsx")
  ],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    height: React.PropTypes.string,
    id: React.PropTypes.string,
  },

  style: function() {
    return {};
  },

  introContent: function () {
    if (this.props.collection.description) {
      return (<PagesShow content={this.props.collection.description} />);
    } else {
      return "";
    }
  },

  showNext: function() {
    if(this.props.collection &&
      this.props.collection.site_path &&
      this.props.collection.site_path.length > 0){
      return (
          <div style={{margin: '0 auto', maxWidth: '500px'}}>
            <SitePathCard
              headerTitle="Continue to"
              siteObject={this.props.collection.site_path[0]}
              addNextButton={true}
              fixedSize={false}
            />
          </div>
      );
    }
    else {
      return null;
    }
  },

  render: function() {
    return (
      <div style={this.style()} id={this.props.id}>
        {this.introContent()}
        {this.showNext()}
      </div>
    );
  }
});

module.exports = CollectionDescription;
