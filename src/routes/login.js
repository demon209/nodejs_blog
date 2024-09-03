const express = require('express')
const router = express.Router()
const PostLogin = require('../app/controllers/PostLogin')
router.post('/login',PostLogin.index)
router.get('/login',PostLogin.Get)
module.exports = router