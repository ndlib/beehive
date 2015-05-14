var LoadRemoteCollectionMixin = {
  loadRemoteCollection: function(url) {
    var url = url;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onreadystatechange = function() {
      if (request.readyState === 4){
        if( request.status === 200) {
          var result = JSON.parse(request.response);
          if (this.isMounted()) {
            this.setValues(result);
          }
        }
      }
    }.bind(this);

    request.onerror = function () {
      window.location = window.location.origin + "/404";
    }

    request.send();

  },
}

module.exports = LoadRemoteCollectionMixin;
