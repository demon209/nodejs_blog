const express = require('express')
const router = express.Router()
const Data = require('../app/controllers/renderData')
router.get('/trangchu',Data.Get)
router.post('/trangchu',Data.index)
module.exports = router