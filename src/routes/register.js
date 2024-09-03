const express = require('express')
const router = express.Router()
const PostRegister = require('../app/controllers/PostRegister')
router.post('/register',PostRegister.index)
router.get('/register',PostRegister.Get)
module.exports = router