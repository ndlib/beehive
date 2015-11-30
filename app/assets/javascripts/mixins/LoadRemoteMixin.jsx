var LoadRemoteMixin = {
  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
      remoteCollectionLoaded: false,
    };
  },

  loadRemoteCollection: function(url) {
    $.ajax({
      context: this,
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(result) {
        // If the object has a setValues method and it returns true, it means the object
        // has already set the state and we should not do it again.
        if(this.setValues == undefined || !this.setValues(result))
        {
          this.setState({
            remoteCollectionLoaded: true,
            collection: result,
          });
        }
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

  loadRemoteSection: function(url) {
    $.ajax({
      context: this,
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(result) {
        SectionActions.setCurrentSection(result.showcases.sections);
        SectionActions.showSectionDialogWindow(result.showcases.sections)
      },
      error: function(request, status, thrownError) {}
    });
  },

  itemOnClick: function() {
    this.loadRemoteItem(this.props.item['@id']);
    window.location.hash = this.props.item['@id'].split("/").pop();
  },

  sectionOnClick: function() {
    this.loadRemoteSection(this.props.section['@id']);
    window.location.hash = this.props.section['@id'].split("/").pop();
  },
}

module.exports = LoadRemoteMixin;
