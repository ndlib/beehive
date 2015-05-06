var React = require('react');

var ShowcaseDropDown = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      showcases: [],
    };
  },

  style: function() {
    return{
      float: "left",
      marginLeft: "15px",
    };
  },

  buttonStyle: function() {
    return {
      background: "transparent",
      border: "1px #f5f5f5 solid",
      height: "40px",
      width: "40px",
      padding: "0",
      marginTop: "10px",
      marginLeft: "10px",
    };
  },

  componentDidMount: function() {
    var url = this.props.collection['@id'] + '/showcases';

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      var showcases = JSON.parse(request.response).showcases;
      if (this.isMounted()) {
        this.setState({
          showcases: showcases,
        });
      }
    }.bind(this);

    request.send();
  },

  render: function() {
    var dropDownOptions = [];
    var collectionUrl = this.collectionUrl(this.props.collection);

    dropDownOptions.push((
      <li className="dropdown-header" value={this.props.collection.id}>
        <a href={collectionUrl}>
          {this.props.collection.title}
        </a>
      </li>
    ));
    dropDownOptions.push((
      <hr/>
    ));

    this.state.showcases.forEach(function(showcase){
      var url = collectionUrl + "/showcases/" + encodeURIComponent(showcase.id) + "/" + encodeURIComponent(showcase.slug);
      dropDownOptions.push ((
        <li className="dropdown-header" value={showcase.id}>
        <a href={url}>
            {showcase.title}
          </a>
        </li>
      ));
    });

    return (
    <div className="btn-group featured-content-dropdown" style={this.style()}>
        <button data-toggle="dropdown" className="btn dropdown-toggle btn-primary" type="button" style={this.buttonStyle()}><span className="caret"></span></button>
        <ul className="dropdown-menu" role="menu">
        {dropDownOptions}
        </ul>
      </div>
    );
  }

});

module.exports = ShowcaseDropDown;
