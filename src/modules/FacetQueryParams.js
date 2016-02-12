module.exports = function(url) {
  var href = url ? url : window.location.href;
  var facets = [];
  var reg = new RegExp( "(facet\\[.*?\\]=[^&#]*)", "i" );
  var facetReg = reg.exec(href);
  while(facetReg !== null) {
    var string = facetReg[0].replace("facet[", "");
    var arr = string.split("]=)";
    facets.push({name: arr[0], value: arr[1]});
    href = href.replace(facetReg[0], "");
    facetReg = reg.exec(href);
  }
  return facets.length > 0 ? facets : null;
};
