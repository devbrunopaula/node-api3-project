const express = require('express')
const UserController = require('./users/users-router')
// const PostController = require('./posts/post-router');

const server = express()

server.use(express.json())
server.use('/api/users', UserController)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

module.exports = server
