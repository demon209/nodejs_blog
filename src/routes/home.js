const express = require('express')
const router = express.Router()
const renderData = require('../app/controllers/renderData')
router.get('/',renderData.index)
module.exports = router