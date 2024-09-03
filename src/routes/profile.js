const express = require('express')
const router = express.Router()
const Profile = require('../app/controllers/Profile')
router.get('/profile',Profile.index)
// router.get('/login',PostLogin.Get)

module.exports = router