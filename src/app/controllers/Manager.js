const Bds = require("../models/bds");
const multer = require("multer");
const path = require("path");
class Manager {
  async list(req, res) {
    try {
      const data = await Bds.find({}).lean(); // Lấy dữ liệu từ Bds
      res.render("adminManager", { data }); // Render template 'adminManager' với dữ liệu lấy được
    } catch (err) {
      res.status(400).json({ error: err.message }); // Xử lý lỗi nếu có
    }
  }
  // Phương thức create để tạo mới Bds
  async create(req, res) {
    const formData = req.body;

    // Xử lý đường dẫn của ảnh chính
    formData.image = req.files["image"]
      ? req.files["image"].map((file) => "/img/" + file.filename)
      : [];

    // Xử lý đường dẫn của ảnh bổ sung
    formData.additionalImages = req.files["additionalImages"]
      ? req.files["additionalImages"].map((file) => "/img/" + file.filename)
      : [];

    try {
      const bds = new Bds(formData);
      await bds.save();
      res.redirect("/adminManager?message=Bấtđộngsảnđãđượclưuthànhcông.");
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Đã xảy ra lỗi: " + error.message });
    }
  }
  async getedit(req, res) {
    try {
      const data = await Bds.findById(req.params.id).lean(); // Lấy dữ liệu cụ thể theo ID
      res.render("edit", { data }); // Truyền dữ liệu vào template
    } catch (err) {
      res.status(400).json({ error: err.message }); // Xử lý lỗi nếu có
    }
  }
  async edit(req, res) {
    Bds.updateOne({ _id: req.params.id }, req.body)
    .then(() =>
      res.redirect("/adminManager")
    );
  }
  async delete(req, res) {
  try {
    const id = req.params.id;
    await Bds.findByIdAndDelete(id); // Xóa bất động sản khỏi cơ sở dữ liệu
    res.redirect('/adminManager'); // Chuyển hướng lại trang quản lý
  } catch (error) {
    res.status(500).send('Không thể xóa bất động sản');
  }
};
}

module.exports = new Manager();
