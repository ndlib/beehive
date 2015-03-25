 var PrevNextMixin = {
  propTypes: {
    section: React.PropTypes.string.isRequired,
  },

  modalID: function() {
    return "#modal-" + this.props.section;
  },

  clickAction: function(event) {
    $(".modal").modal("hide");
    $(this.modalID()).modal("show");
  },
}

module.exports = PrevNextMixin;
