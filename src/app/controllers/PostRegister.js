const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class PostRegister {
    async index(req, res){
        const { fullname, nickname, password,'confirm-password': confirmPassword, phone, email } = req.body;
        try {
          const existingUser = await User.findOne({ nickname });
          if (existingUser) {
            return res.render('register', {
              errorMessage: 'Nickname đã có người dùng.'
          });
        }
        if (password !== confirmPassword) {
          return res.render('register', {
            errorMessage: 'Mật khẩu và xác nhận mật khẩu không khớp.'
          });
        }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            fullname,
            nickname,
            password: hashedPassword,
            phone,
            email,
          });
          await newUser.save();
          res.redirect("/registerAccpt");
        } catch (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            message: "Đăng ký thất bại: " + error.message,
          });
        }
      };
      Get(req,res){
        res.render('register');
      }
}

module.exports = new PostRegister();
