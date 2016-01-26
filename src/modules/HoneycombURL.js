
module.exports = function() {
  let HONEYCOMB_URL;
  if(process.env.NODE_ENV == 'development') {
    HONEYCOMB_URL = 'http://localhost:3017';
  }
  else if(process.env.NODE_ENV == 'production') {
    HONEYCOMB_URL = 'http://honeycomb.library.nd.edu'
  }
  return HONEYCOMB_URL;
}
