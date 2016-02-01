var fs = require('fs-extra');
var path = require('path');
var express = require('express');
var rewrite = require('express-urlrewrite');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3018));

// Routes for real application with React-Router

app.use('/resources', express.static(path.join(__dirname, 'public/resources')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(rewrite('/*', '/index.html'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
