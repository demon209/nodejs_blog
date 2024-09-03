const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const session = require('express-session');
const app = express();
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false, // Thay đổi từ true sang false để bảo mật hơn
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/batdongsan' }) // Lưu session vào MongoDB
}));
class PostLogin {
  async index(req, res) {
      const { nickname, password } = req.body;
      try {
          const user = await User.findOne({ nickname });
          if (!user) {
            return res.render('login', {
                errorMessage: 'Người dùng không tồn tại.'
            });
  }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.render('login', {
                errorMessage: 'Sai mật khẩu.'
            });
          }

          // Lưu thông tin người dùng vào session
          req.session.user = { id: user._id, nickname: user.nickname };
          const isLoggedIn = req.session.user ? true : false;
          if (user.nickname === 'admin') {
              return res.redirect('/adminManager');
          }

          return res.redirect('/trangchu');
      } catch (error) {
          console.error("Error during login:", error);
          res.status(500).json({ success: false, message: "Đã xảy ra lỗi. Vui lòng thử lại." });
      }
  }

  Get(req, res) {
      res.render("login");
  }
}

module.exports = new PostLogin();
