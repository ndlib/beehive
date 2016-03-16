module.exports = function(id, string){
  if (id) {
    if(string === undefined) {
      string = 'item';
    }
    var path = window.location.pathname;

    if(path.substr(-1) === '/') {
        path =  path.substr(0, path.length - 1);
    }
    var reg = new RegExp('(' + string +')=.*[^&]', 'i');

    var searchStr = window.location.search;

    var searchReg = reg.exec(searchStr);
    console.log(searchReg);
    if(searchStr.length > 0 && searchReg === null) {
      searchStr += '&' + string + '=' + id;
    } else if(searchStr.length > 0 && searchReg !== null) {
      searchStr = searchStr.replace(reg, string + '=' + id);
    }
    else {
      searchStr = '?' + string + '=' + id;
    }

    history.pushState({}, '', path + searchStr);
  }
  return;
};
