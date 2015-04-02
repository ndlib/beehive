 var PrevNextMixin = {
  propTypes: {
    id: React.PropTypes.string.isRequired,
  },

  modalID: function() {
    return "#modal-" + this.props.id;
  },

  clickAction: function(event) {
    $(".modal").modal("hide");
    $(this.modalID()).modal("show");
    window.location.hash = "modal-" + this.props.id;
    event.preventDefault();
  },
}

module.exports = PrevNextMixin;
