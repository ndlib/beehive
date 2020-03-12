const fs = require('fs-extra')
const path = require('path')
const express = require('express')
const rewrite = require('express-urlrewrite')
const compression = require('compression')
const bodyParser = require('body-parser')
const app = express()
const https = require('https')

app.set('port', (process.env.PORT || 3018))

// Compresses requests/responses for better performance
app.use(compression())

// Routes for real application with React-Router

app.use('/resources', express.static(path.join(__dirname, 'public/resources'), { maxAge: '7d' }))
app.use('/vendor', express.static(path.join(__dirname, 'public/vendor'), { maxAge: '30d' }))
app.use('/images', express.static(path.join(__dirname, 'public/images'), { maxAge: '30d' }))
app.use('/sitemap', express.static(path.join(__dirname, 'public/sitemap')))
app.use('/sitemap.xml', express.static(path.join(__dirname, 'public/sitemap/sitemap-index.xml')))
app.use(rewrite('/*', '/index.html'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}, app)
  .listen(app.get('port'), function () {
    console.log('Server started: https://localhost:' + app.get('port') + '/')
  })
