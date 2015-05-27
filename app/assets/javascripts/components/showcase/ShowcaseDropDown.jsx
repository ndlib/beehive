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
      height: "30px",
      width: "30px",
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

  dropDownOptions: function() {
    var options = [];
    var collectionUrl = this.collectionUrl(this.props.collection);
    var introUrl = this.introUrl(this.props.collection);

    options.push((
      <li key="dropdown-home" className="dropdown-header" value={this.props.collection.id}>
        <a href={collectionUrl}>Home</a>
      </li>
    ));

    options.push((
      <hr key="dropdown-spacer" />
    ));

    if (introUrl) {
      options.push((
        <li key="dropdown-intro" className="dropdown-header" value={this.props.collection.id}>
          <a href={introUrl}>Introduction</a>
        </li>
      ));
    }


    this.state.showcases.forEach(function(showcase){
      var url = collectionUrl + "/showcases/" + encodeURIComponent(showcase.id) + "/" + encodeURIComponent(showcase.slug);
      options.push ((
        <li key={showcase.id} className="dropdown-header" value={showcase.id}>
          <a href={url}>
            {showcase.name}
          </a>
        </li>
      ));
    });
    return options
  },

  render: function() {
    return (
    <div className="btn-group featured-content-dropdown" style={this.style()}>
        <button data-toggle="dropdown" className="btn dropdown-toggle btn-primary" type="button" style={this.buttonStyle()}><span className="mdi-image-photo-library"></span></button>
        <ul className="dropdown-menu" role="menu">
        {this.dropDownOptions()}
        </ul>
      </div>
    );
  }

});

module.exports = ShowcaseDropDown;
