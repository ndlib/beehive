var fs = require('fs-extra')
var path = require('path')
var express = require('express')
var rewrite = require('express-urlrewrite')
var compression = require('compression')
var bodyParser = require('body-parser')
var app = express()

app.set('port', (process.env.PORT || 3018))

// Compresses requests/responses for better performance
app.use(compression())

// Routes for real application with React-Router

app.use('/resources', express.static(path.join(__dirname, 'public/resources')), {maxAge: '7d'})
app.use('/vendor', express.static(path.join(__dirname, 'public/vendor')), {maxAge: '30d'})
app.use('/images', express.static(path.join(__dirname, 'public/images')), {maxAge: '30d'})
app.use('/sitemap', express.static(path.join(__dirname, 'public/sitemap')))
app.use('/sitemap.xml', express.static(path.join(__dirname, 'public/sitemap/sitemap-index.xml')))
app.use(rewrite('/*', '/index.html'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})
