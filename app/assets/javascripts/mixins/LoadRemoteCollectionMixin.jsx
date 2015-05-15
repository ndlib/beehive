var LoadRemoteCollectionMixin = {
  loadRemoteCollection: function(url) {
    var url = url;
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      dataType: "json",
      success: function(result) {
        this.setValues(result);
      },
      error: function(request, status, thrownError) {
        window.location = window.location.origin + "/404";
      }
    });
  },
}

module.exports = LoadRemoteCollectionMixin;
