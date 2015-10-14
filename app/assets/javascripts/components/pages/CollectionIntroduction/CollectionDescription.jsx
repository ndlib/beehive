var React = require('react');
var Scroll = require('react-scroll');

var Link = Scroll.Link;
var Element = Scroll.Element;

var CollectionDescription = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
    height: React.PropTypes.string,
    id: React.PropTypes.string,
  },

  style: function() {
    return {};
  },

  render: function() {
    return (
      <div style={this.style()} id={this.props.id}>
        <div className="collection-description" dangerouslySetInnerHTML={{__html: this.props.collection.description}} />
        <Element name="startShowcases" className="element">
          <StartShowcaseButton collection={this.props.collection} />
        </Element>
      </div>
    );
  }
});

module.exports = CollectionDescription;
