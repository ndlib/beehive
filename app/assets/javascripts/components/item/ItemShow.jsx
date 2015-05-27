//app/assets/javascripts/components/ItemShow.jsx
var React = require('react');

var ItemShow = React.createClass({
  displayName: 'Item Show',

  propTypes: {
    item: React.PropTypes.object,
    additionalDetails: React.PropTypes.string,
    previousItem: React.PropTypes.string,
    nextItem: React.PropTypes.string,
    height: React.PropTypes.number,
  },

  componentDidMount: function() {
    var id = '#modal-' + this.props.item.id;

    // bind keypress to modal when it is shown
    $(id).on('show.bs.modal', {props: this.props}, function (event) {
      $(document).bind('keyup', {props: event.data.props},
        function(event) {
          // if left or up arrow
          if(event.keyCode == 37 || event.keyCode == 38) {
            if(event.data.props.previousItem) {
              $('#modal-' + event.data.props.item.id).modal('hide');
              $('#modal-' + event.data.props.previousItem).modal('show');
              window.location.hash = 'modal-' +  event.data.props.previousItem;
            }
          }
          // if right or down arrow
          else if(event.keyCode == 39 || event.keyCode == 40) {
            if(event.data.props.nextItem) {
              $('#modal-' + event.data.props.item.id).modal('hide');
              $('#modal-' + event.data.props.nextItem).modal('show');
               window.location.hash = 'modal-' +  event.data.props.nextItem;
            }
          }
        }
      );
    });
    // remove keybindings when modal hidden
    $(id).on('hide.bs.modal', function () {
      $(document).unbind('keyup');
    });
  },

  getInitialState: function() {
    return {
      showDetails: true,
    };
  },

  toggleDetails: function() {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  },

  outerStyles: function() {
    if (this.props.height) {
      return {
        height: this.props.height,
        position: 'relative',
      }
    } else {
      return {}
    }
  },

  headerStyles: function() {
    if (this.props.height) {
      return {
        position: 'absolute',
        top: '10px',
        left: '40px',
        width: 'auto',
        zIndex: 200,
      }
    } else {
      return {}
    }
  },

  zoomStyles: function() {
    if (this.props.height) {
      return {
        height: this.props.height,
        position: 'absolute',
        top: 0,
        width: '100%',
      }
    } else {
      return {}
    }
  },

  detailsButtonStyle: function() {
    return {
      backgroundColor: this.state.showDetails ? '#ccc' : '#fff',
    };
  },

  detailsStyle: function() {
    return {
      maxHeight: this.state.showDetails ? '70%' : '0',
      width: this.state.showDetails ? '30%' : '0',
    };
  },

  render: function() {
    var prev, next, offsetTop;
    if (this.props.height) {
      offsetTop = this.props.height / 2;
    }
    if (this.props.item) {
      if (this.props.previousItem) {
        prev = (<PreviousModal offsetTop={offsetTop} id={this.props.previousItem} />);
      }
      if (this.props.nextItem) {
        next = (<NextModal offsetTop={offsetTop} id={this.props.nextItem} />);
      }
      return (
        <div>
          {prev}
          {next}
          <div className="item-detail" style={this.outerStyles()}>

            <div style={this.headerStyles()}>
              <h2>{this.props.item.name}</h2>
            </div>
            <button className="btn btn-default btn-raised pull-right btn-details" onClick={this.toggleDetails} style={this.detailsButtonStyle()}>
              <i className={this.state.showDetails ? "mdi-action-visibility-off" : "mdi-action-visibility"}></i>
              Details
            </button>
            <div className="details" style={this.detailsStyle()}>
              <Details item={this.props.item} additionalDetails={this.props.additionalDetails} />
            </div>
            <div className="item-detail-zoom" style={this.zoomStyles()}>
              <OpenseadragonViewer image={this.props.item.image} containerID={this.props.item.id} height={this.props.height} toolbarTop={60} toolbarLeft={40} showFullPageControl={false} />
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }

  }

});

// each file will export exactly one component
module.exports = ItemShow;
