
module.exports = function() {
  if(process.env.NODE_ENV == 'production') {
    return 'http://honeycomb.library.nd.edu';
  }
  else if(process.env.NODE_ENV == 'preproduction') {
    return 'http://honeycombpprd-vm.library.nd.edu';
  }
  else {
    return 'http://localhost:3017';
  }
}
