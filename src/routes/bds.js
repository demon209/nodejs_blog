const express = require('express')
const router = express.Router()
const bdsDetail = require('../app/controllers/bdsDetail');
router.get("/bds/:id", bdsDetail.detail);
module.exports = router