const express = require('express')
const path = require('path')
const port = process.env.PORT || 3020
const server = express()

// serve static assets normally
server.use(express.static(__dirname + '/build'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
server.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

server.listen(port)
console.log("server started on port " + port)
