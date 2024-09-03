const express = require('express')
const router = express.Router()
const Manager = require('../app/controllers/Manager')
router.get('/edit/:id',Manager.getedit)
router.put('/edit/:id',Manager.edit)
router.delete('/adminManager/:id',Manager.delete)
module.exports = router