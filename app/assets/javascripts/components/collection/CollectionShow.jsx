//app/assets/javascripts/components/CollectionShow.jsx
var React = require('react');

var CollectionShow = React.createClass({
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
    var innerHeight = $('#main-collection-description .collection-description').outerHeight(true);
    if(innerHeight > outerHeight) {
      if(this.state.overflow == "") {
        this.setState({overflow: (<div style={this.overflowStyle()}>MORE</div>)});
      }
    }
  },

  render: function() {
    var overflow = this.state.overflow;
    if (this.props.collection) {
      return (
        <div className="jumbotron">
          <div className="container collection-show">
            <div className="collection-text">
              <h1>{this.props.collection.title}</h1>
              <div className="row">
                <div className="collection-image col-md-4">
                  <Thumbnail image={this.props.collection.image} thumbnailType="medium" />
                </div>
                <div className="col-md-8">
                  <a href="#modal-collection-description" data-toggle="modal" data-target="#modal-collection-description" style={this.aStyle()}>
                    <CollectionDescription collection={this.props.collection} height="400" id="main-collection-description" />
                    {overflow}
                  </a>
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
