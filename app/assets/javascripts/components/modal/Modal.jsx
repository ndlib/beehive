//app/assets/javascripts/components/modal/Modal.jsx
var React = require('react');

var Modal = React.createClass({
  displayName: 'Modal',

  propTypes: {
    id: React.PropTypes.string.isRequired,
    content: React.PropTypes.object.isRequired,
  },

  setStyle: function(h) {
    return {
      height: h,
      marginTop: $('#banner').height(),
    }
  },

  removeHash: function() {
    window.location.hash = '';
  },

  onKeyDown: function(event) {
    // if key is escape
    if(event.keyCode == 27) {
      this.removeHash();
    }
  },

  render: function () {
    var modalHeight = $(window).height() - $('#banner').height();

    return (
      <div className="modal" id={this.props.id} tabIndex="-1"  onKeyDown={this.onKeyDown}>
        <div className="modal-dialog modal-lg" style={this.setStyle(modalHeight)}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.removeHash}><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">{this.props.content}</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
