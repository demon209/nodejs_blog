const express = require('express')
const router = express.Router()
const Managers = require('../app/controllers/Manager')
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img')); // Đảm bảo thư mục tồn tại
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });
const uploadFiles = upload.fields([
    { name: 'image', maxCount: 10 }, // Ảnh chính
    { name: 'additionalImages', maxCount: 10 } // Ảnh bổ sung
]);


router.post('/adminManager', uploadFiles, (req, res) => {
     Managers.create(req, res);
})
router.get('/adminManager',Managers.list)
module.exports = router