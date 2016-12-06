module.exports = function(string) {
  if(string.includes('dave.library.nd.edu') || string.includes('localhost:3024')) {
    var sIndex = string.indexOf('?');
    var newReferral = '?ref=' + window.location;
    if(sIndex > -1) {
      string = string.substring(0, string.indexOf('?')) + newReferral;
    } else {
      string += newReferral;
    }
  }
  return string;
}
