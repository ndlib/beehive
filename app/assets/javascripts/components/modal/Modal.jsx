//app/assets/javascripts/components/modal/Modal.jsx
var React = require('react');

var Modal = React.createClass({
  displayName: 'Modal',

  propTypes: {
    id: React.PropTypes.string.isRequired,
    content: React.PropTypes.object.isRequired,
  },

  getStyleValues: function() {
    var bannerHeight = $('#banner').outerHeight();
    var footerHeight = $('#footer').outerHeight();
    return {
      height: $(window).height() - bannerHeight - footerHeight,
      marginTop: bannerHeight,
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

  setModalStyles: function(e) {
    console.log(e);
    this.modalElement.find('.modal-dialog').css(this.getStyleValues());
  },

  componentDidMount: function() {
    this.modalElement = $('#' + this.props.id)
    this.modalElement.on('show.bs.modal', this.setModalStyles);
  },

  componentWillUnmount: function() {
    this.modalElement.off('show.bs.modal', this.setModalStyles);
  },

  render: function () {
    return (
      <div className="modal" id={this.props.id} tabIndex="-1"  onKeyDown={this.onKeyDown}>
        <div className="modal-dialog modal-lg">
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
