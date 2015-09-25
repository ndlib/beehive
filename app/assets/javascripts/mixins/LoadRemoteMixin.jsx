var LoadRemoteMixin = {
  loadRemoteCollection: function(url) {
    $.ajax({
      context: this,
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(result) {
        this.setValues(result);
      },
      error: function(request, status, thrownError) {
        window.location = window.location.origin + '/404';
      }
    });
  },

  loadRemoteItem: function(url){
    $.ajax({
      context: this,
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(result) {
        ItemActions.setCurrentItem(result.items);
        ItemActions.showItemDialogWindow(result.items);
      },
      error: function(request, status, thrownError) {}
    });
  },

  loadRemoteSection: function(section) {
    console.log('Clicked a section', section);
  },

  itemOnClick: function() {
    var item = this.loadRemoteItem(this.props.item['@id']);
    window.location.hash = this.props.item['@id'].split("/").pop();
  },
}

module.exports = LoadRemoteMixin;
