//app/assets/javascripts/components/CollectionShow.jsx
var React = require('react');

var CollectionShow = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Collection Show',

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  overflowStyle: function() {
    return {
      position: 'absolute',
      bottom: '0px',
      right: '0px',
      zIndex: '2',
      height: '60px',
      lineHeight: '60px',
      width: '100%',

      textAlign: 'center',
      marginLeft: '-14px',
      background: 'black',
      background: "-moz-linear-gradient(top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)",
      background: "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.4)), color-stop(55%,rgba(0,0,0,1)), color-stop(100%,rgba(0,0,0,1)))",
      background: "-webkit-linear-gradient(top, rgba(0,0,0,0.4) 0%,rgba(0,0,0,1) 55%,rgba(0,0,0,1) 100%)",
      background: "-o-linear-gradient(top, rgba(0,0,0,0.4) 0%,rgba(0,0,0,1) 55%,rgba(0,0,0,1) 100%)",
      background: "-ms-linear-gradient(top, rgba(0,0,0,0.4) 0%,rgba(0,0,0,1) 55%,rgba(0,0,0,1) 100%)",
      background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,1) 55%,rgba(0,0,0,1) 100%)",

    };
  },

  aStyle: function() {
    return {
      position: "relative",
      display: "block",
    };
  },

  getInitialState: function() {
    return {
      overflow: "",
    };
  },

  componentDidMount: function() {

  },

  componentDidUpdate: function() {
      this.checkShowMore();
  },

  checkShowMore: function() {
    var outerHeight = $('#main-collection-description').outerHeight(true);
    var innerHeight = $('#main-collection-description .collection-intro').outerHeight(true);
    if(innerHeight > outerHeight) {
      if(this.state.overflow == "") {
        this.setState({overflow: (<div style={this.overflowStyle()}>MORE</div>)});
      }
    }
  },

  render: function() {
    var intro_url = this.introUrl(this.props.collection);
    var overflow = this.state.overflow;
    var titleStyle = {};
    var buttonStyle = {};
    if (this.props.collection) {
      if(this.props.collection.image) {
        titleStyle = {display: "none",};
        buttonStyle =  {
          margin: "4em 0 0 -50px",
          position: "absolute",
          bottom: "25%",
          width: "100px",
          left: "50%",
        };
      }
      else {
        buttonStyle = {margin: "4em auto 0",};
      }
      return (
        <div className="jumbotron">
          <div className="container collection-show">
            <div className="collection-text">
              <h1 style={titleStyle}>{this.props.collection.name}</h1>
              <Thumbnail image={this.props.collection.image} thumbnailType="medium" />
<<<<<<< HEAD
                  <a href={intro_url} className="start">Start <i className="mdi-navigation-chevron-right"></i></a>
=======
                  <a href={intro_url} className="start" style={buttonStyle}>Start</a>
>>>>>>> Position start button from bottom if no title.
              <div className="row">
                <div className="collection-image col-md-12">
                </div>
              </div>
            </div>
          </div><div className="clear">&nbsp;</div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
});

// each file will export exactly one component
module.exports = CollectionShow;
