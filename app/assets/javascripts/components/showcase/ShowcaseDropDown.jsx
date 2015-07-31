var React = require('react');

var ShowcaseDropDown = React.createClass({
  mixins: [CollectionUrlMixin, TitleConcatMixin],

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
      height: "30px",
      width: "30px",
      padding: "0",

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
      var showcaseName = this.titleConcat(showcase.name_line_1, showcase.name_line_2);
      options.push ((
        <li key={showcase.id} className="dropdown-header" value={showcase.id}>
          <a href={url}>
            {showcaseName}
          </a>
        </li>
      ));
    }.bind(this));
    return options
  },

  render: function() {
    return (
    <div className="btn-group featured-content-dropdown">
        <button data-toggle="dropdown" className="btn dropdown-toggle btn-primary featured-content-dropdown-button" type="button"><span className="mdi-navigation-menu"></span></button>
        <ul className="dropdown-menu" role="menu">
        {this.dropDownOptions()}
        </ul>
      </div>
    );
  }

});

module.exports = ShowcaseDropDown;
