const express = require('express')
const router = express.Router()
const bdsDetail = require('../app/controllers/bdsDetail');
function checkAuthenticated(req, res, next) {
    if (req.session.user || req.path === '/forgot-password' || req.path === '/reset-password') {
      return next(); // Cho phép truy cập nếu đã đăng nhập hoặc vào các trang cho phép không cần đăng nhập
    }
    res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu không có session
  }
router.get("/bds/:id", checkAuthenticated,bdsDetail.detail);
module.exports = router