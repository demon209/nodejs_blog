const express = require('express')
const router = express.Router()
const Password = require('../app/controllers/Password');
function checkAuthenticated(req, res, next) {
    if (req.session.user || req.path === '/forgot-password' || req.path === '/reset-password') {
      return next(); // Cho phép truy cập nếu đã đăng nhập hoặc vào các trang cho phép không cần đăng nhập
    }
    res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu không có session
  }
  
router.get('/forgot-password',Password.showForgotPassword)
router.get('/reset-password',Password.showResetPassword)
router.post('/forgot-password',Password.handleForgotPassword)
router.post('/reset-password', checkAuthenticated, Password.handleResetPassword);
module.exports = router