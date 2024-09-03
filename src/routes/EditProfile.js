const express = require('express')
const router = express.Router()
const Profile = require('../app/controllers/Profile')
function checkAuthenticated(req, res, next) {
    if (req.session.user || req.path === '/forgot-password' || req.path === '/reset-password') {
      return next(); // Cho phép truy cập nếu đã đăng nhập hoặc vào các trang cho phép không cần đăng nhập
    }
    res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu không có session
  }
  
router.get('/profile/:id',Profile.index)
router.put('/profile/:id',Profile.edit)
router.delete('/profile/:id',Profile.delete)
router.post('/profile/change-password', checkAuthenticated, Profile.changePassword);
module.exports = router