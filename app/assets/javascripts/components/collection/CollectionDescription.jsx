var React = require('react');

var CollectionDescription = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
    height: React.PropTypes.string,
    id: React.PropTypes.string,
  },

  style: function() {
    if(this.props.height) {
      return {
        maxHeight: this.props.height + 'px',
        overflow: 'hidden',
      };
    } else {
      return {};
    }
  },

  render: function() {
    return (
      <div className="row row-fluid">
        <div className="col-md-12">
          <div style={this.style()} id={this.props.id}>

            <div className="collection-description" dangerouslySetInnerHTML={{__html: this.props.collection.description}} />
            <div className="col-sm-4"/>
            <StartShowcaseButton collection={this.props.collection} />
          </div>

        </div>
      </div>
    )
  }
});

module.exports = CollectionDescription;
