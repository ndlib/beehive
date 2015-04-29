//app/assets/javascripts/components/ShowcasesList.jsx
var React = require('react');

var ShowcasesList = React.createClass({
  displayName: 'Showcases List',

  propTypes: {
    showcases: React.PropTypes.array.isRequired,
  },

  render: function() {
    if (this.props.showcases.length > 0) {
      return (
        <div className="showcases-list">
          <ShowcasesCardList showcases={this.props.showcases} />
        </div>
      );
    }
    else {
      return (<span/>);
    }
  }
});

// each file will export exactly one component
module.exports = ShowcasesList;
