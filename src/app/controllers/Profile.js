const User = require("../models/user.js");
const bcrypt = require("bcrypt");
class Profile {
    async index(req, res) {
    if (req.session.user) {
        try {
           const user = await User.findById(req.session.user.id);
            if (!user) {
                return res.render('profile', {
                    user: null, // Trường hợp người dùng không tồn tại
                    errorMessage: 'Người dùng không tồn tại.'
                });

            }
            res.render('profile', {user});
        } catch (err) {
            console.error("Lỗi khi lấy thông tin người dùng:", err);
            res.status(500).send('Lỗi khi lấy thông tin người dùng.');
        }
    } else {
        res.redirect('/login');
    }
  };
  async edit(req, res) {
    User.updateOne({ _id: req.params.id }, req.body)
    .then(() =>
        res.render('profile', {
            Message: 'Cập nhật thông tin thành công.'
        }));
  }
    async changePassword(req, res) {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.session.user.id; // Lấy user ID từ session
  
    try {
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).render('profile', { errorMessage: 'Người dùng không tồn tại' });
      }
  
      // Kiểm tra mật khẩu cũ
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).render('profile', { Message: 'Mật khẩu cũ không đúng' });
      }
  
      // Kiểm tra xem mật khẩu mới có khớp với xác nhận mật khẩu mới
      if (newPassword !== confirmNewPassword) {
        return res.status(400).render('profile', {Message: 'Mật khẩu mới và xác nhận mật khẩu không khớp' });
      }
  
      // Hash mật khẩu mới và lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.render('profile', { successMessage: 'Mật khẩu đã được đổi thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).render('profile', { errorMessage: 'Có lỗi xảy ra, vui lòng thử lại sau' });
    }
  }
  async delete(req, res){
    const id = req.params.id;
    await User.findByIdAndDelete(id); // Xóa khỏi cơ sở dữ liệu
    res.redirect('/login'); // Chuyển hướng lại trang đăng nhập
  };
}
module.exports = new Profile()