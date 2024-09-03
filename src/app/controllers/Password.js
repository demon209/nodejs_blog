const User = require("../models/user.js");
const bcrypt = require("bcrypt");
class Password {
// Đảm bảo đường dẫn đúng

// Hiển thị trang quên mật khẩu
    showForgotPassword(req, res){
        res.render('forgot-password'); // Hoặc res.sendFile nếu bạn dùng file HTML tĩnh
    };
    showResetPassword(req, res){
        res.render('reset-password'); // Hoặc res.sendFile nếu bạn dùng file HTML tĩnh
    };

// Xử lý yêu cầu quên mật khẩu
   async handleForgotPassword(req, res){
    const { fullname, nickname, phone, email } = req.body;
  try {
    const user = await User.findOne({ fullname, nickname, phone, email });
    if (!user) {
      return res.status(404).render('forgot-password', { errorMessage: 'Thông tin không chính xác' });
    }
    req.session.userId = user._id;
    res.render('reset-password', { nickname, message: 'Thông tin xác minh chính xác. Vui lòng đặt mật khẩu mới.' });
  } catch (error) {
    console.error(error);
    res.status(500).render('forgot-password', { errorMessage: 'Có lỗi xảy ra, vui lòng thử lại sau' });
  }
};

// Hiển thị trang đặt lại mật khẩu
    
// Xử lý yêu cầu đặt lại mật khẩu
   async handleResetPassword(req, res){
  const { newPassword, confirmNewPassword } = req.body;
  const userId = req.session.userId; // Lấy ID từ session

  if (newPassword !== confirmNewPassword) {
    return res.status(400).render('reset-password', { errorMessage: 'Mật khẩu mới và xác nhận mật khẩu không khớp' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).render('reset-password', { errorMessage: 'Người dùng không tồn tại' });
    }
    user.password = hashedPassword;
    await user.save();
    res.redirect('/login'); // Chuyển hướng đến trang đăng nhập hoặc trang khác
  } catch (error) {
    console.error(error);
    res.status(500).render('reset-password', { errorMessage: 'Có lỗi xảy ra, vui lòng thử lại sau' });
  }
};

}
  
module.exports = new Password();
  