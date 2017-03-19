'use strict'

const mongoose = require('mongoose')
require('dotenv').config()

// Build the connection string
var dbURI = `mongodb://${process.env.HOST_NAME}/${process.env.DATABASE_NAME}`

// Create the database connection
mongoose.connect(dbURI)
mongoose.Promise = global.Promise

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + dbURI)
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})
