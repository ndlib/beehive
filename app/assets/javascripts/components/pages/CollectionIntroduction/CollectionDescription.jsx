var React = require('react');
var Scroll = require('react-scroll');

var Link = Scroll.Link;
var Element = Scroll.Element;

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
      return (<EssayContent content={this.props.collection.description} />);
    } else {
      return "";
    }
  },

  render: function() {
    return (
      <div style={this.style()} id={this.props.id}>
        {this.introContent()}
        <Element name="startShowcases" className="element">
          <StartShowcaseButton collection={this.props.collection} />
        </Element>
      </div>
    );
  }
});

module.exports = CollectionDescription;
