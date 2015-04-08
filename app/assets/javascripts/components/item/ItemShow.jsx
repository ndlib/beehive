//app/assets/javascripts/components/ItemShow.jsx
var React = require('react');

var ItemShow = React.createClass({
  displayName: 'Item Show',

  propTypes: {
    item: React.PropTypes.object,
    additionalDetails: React.PropTypes.string,
    previousItem: React.PropTypes.string,
    nextItem: React.PropTypes.string,
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

  detailsButtonStyle: function() {
    return {
      backgroundColor: this.state.showDetails ? '#ccc' : '#fff',
    };
  },

  detailsStyle: function() {
    return {

      height: this.state.showDetails ? '60%' : '0',
      width: this.state.showDetails ? '30%' : '0',
    };
  },

  render: function() {
    var item = "";
    var prev = "";
    var next = "";
    if (this.props.item) {
    if (this.props.previousItem) {
        prev = (<PreviousModal id={this.props.previousItem} />);
      }
      if (this.props.nextItem) {
        next = (<NextModal id={this.props.nextItem} />);
      }
      return (
        <div className="item-detail"><button className="btn btn-default btn-raised pull-right btn-details" onClick={this.toggleDetails} style={this.detailsButtonStyle()}>
            <i className={this.state.showDetails ? "mdi-navigation-unfold-less" : "mdi-navigation-unfold-more"}></i>
            Details
          </button>
          <h2>{this.props.item.title}</h2>
          {prev}
          {next}
          <div className="row">
            <div className={"col-md-12"} style={{transition: 'initial'}}>
              <OpenseadragonViewer image={this.props.item.image} containerID={this.props.item.id} height={600} />
            </div>


          </div>
          <div className="details" style={this.detailsStyle()}><Details item={this.props.item} additionalDetails={this.props.additionalDetails} /></div>
        </div>
      );
    } else {
      return <Loading />;
    }

  }

});

// each file will export exactly one component
module.exports = ItemShow;
