const express = require("express");
const multer = require("multer");
const session = require('express-session');
const path = require("path");
const methotOverride =  require('method-override')
const MongoStore = require("connect-mongo");
const expressHandlebars = require("express-handlebars").create({
  defaultLayout: "main",
  extname: ".hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});
const app = express();
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false, // Thay đổi từ true sang false để bảo mật hơn
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/batdongsan' }) // Lưu session vào MongoDB
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const morgan = require("morgan");

const port = 3000;
// import mongodb
const db = require("./config/db");
// connect to db
db.connect();
const Bds = require("./app/models/bds.js");
const User = require("./app/models/user.js")
// router
const route = require('./routes')
//sass
app.use(express.static(path.join(__dirname, "public")));
// HTTP Logger
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methotOverride('_method'))
//template engine

const hbs = require('handlebars');
hbs.registerHelper("sum", function(a, b)
{
    return parseInt(a) + parseInt(b);
});
hbs.registerHelper("range", function(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
      result.push(i);
  }
  return result;
});

hbs.registerHelper("add", function(a, b) {
  return a + b;
});

hbs.registerHelper("subtract", function(a, b) {
  return a - b;
});

hbs.registerHelper("eq", function(a, b) {
  return a === b;
});

hbs.registerHelper("gt", function(a, b) {
  return a > b;
});

hbs.registerHelper("lt", function(a, b) {
  return a < b;
});
app.use(express.json());
app.use(morgan("combined"));
// Template engine
app.engine(".hbs", expressHandlebars.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));
;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
route(app);
function checkAuthenticated(req, res, next) {
  if (req.session.user || req.path === '/forgot-password' || req.path === '/reset-password') {
    return next(); // Cho phép truy cập nếu đã đăng nhập hoặc vào các trang cho phép không cần đăng nhập
  }
  res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu không có session
}
app.use(checkAuthenticated); // Áp dụng middleware cho tất cả các route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.redirect('/'); // Xử lý lỗi nếu cần
      }
      res.clearCookie('connect.sid'); // Xóa cookie session
      return res.redirect('/login'); // Chuyển hướng về trang đăng nhập
  });
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
