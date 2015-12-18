var React = require('react');
var mui = require('material-ui');

var CollectionDescription = React.createClass({
  mixins: [MuiThemeMixin],

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
      this.props.collection.showcases &&
      this.props.collection.showcases.length > 0){
      return (
          <div style={{margin: '0 auto', maxWidth: '500px'}}>
            <ShowcaseCard
              headerTitle="Start Showcases"
              showcase={this.props.collection.showcases[0]}
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
