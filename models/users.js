'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')

require('../config/config')

let email_validation = [
  validate({
    validator: 'isEmail',
    message: 'invalid email format'
  })
]

let password_validation = [
  validate({
    validator: 'isLength',
    arguments: [5],
    message: 'Prevent weak password! min. 5 char'
  })
]

let userSchema = new Schema({
  username: {
    type: String,
    required: [ true, 'Username is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: email_validation
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: password_validation
  },
  salt: String
}, {
  timestamps: true
})

let User = mongoose.model('Users', userSchema)

module.exports = User
