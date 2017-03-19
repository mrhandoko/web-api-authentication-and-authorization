'use strict'

const jwt = require('jsonwebtoken')
const Model = require('../models/users')
const crypto = require('crypto')
const User = {}

// Generating Salt
let randomSalt = () => {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for ( var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

// JWT secret
let jwtSecret = 'kukukakikakekkukakukaku'

const secret = randomSalt()

User.register = (req, res, next) => {
  Model.create({
    username: req.body.username,
    email: req.body.email,
    password: crypto.createHmac('sha256', secret).update(req.body.password).digest('hex'),
    salt: secret
  }).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
}

User.login = (req, res, next) => {
  Model.findOne({ username: req.body.username}).then((username) => {
    if (!username) {
      res.send({undefined_user: true})
    } else {
      if (username.password == crypto.createHmac('sha256', username.salt).update(req.body.password).digest('hex')) {
        let authorized = jwt.sign({email: req.body.username}, jwtSecret, {})

        res.send({authorization: authorized})
      } else {
        res.send({ wrongPassword: true})
      }
    }
  }).catch((err) => {
    res.send({error: err})
  })
}

module.exports = User
