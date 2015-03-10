//app/assets/javascripts/components/AdditionalResources.jsx
var React = require('react');

var AdditionalResources = React.createClass({
  displayName: 'Additional Resources',

  propTypes: {
    items: React.PropTypes.array,
  },

  render: function() {
    var itemNodes = this.props.items.map(function(item, index) {
      var nodes = [];
      nodes.push((
       <div className={(index%2 == 0) ? "row odd" : "row even"}><AdditionalResourcesItem item={item} /></div>
      ));
      return nodes;
    });
    return (
      <div className="additional-resources">
        <div className="container">
          <h3>Additional Resources</h3>
          {itemNodes}
        </div>
      </div>
    );
  }
});

module.exports = AdditionalResources;
