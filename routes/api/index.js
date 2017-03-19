var express = require('express')
var router = express.Router()
var User = require('../../controllers/user')

router.post('/login', User.login)
router.post('/register', User.register)

module.exports = router
