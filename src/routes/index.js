const LoginRouter = require("./login");
const RegisterRouter = require('./register')
const Bds = require("../app/models/bds");
const renderData = require("./home");
const bdsDetailrouter = require("./bds");
const UserProfile = require('./profile')
const ManagersRouter=require('./Managers')
const EditRouter = require('./Edit')
const EditProfileRouter = require('./EditProfile')
const PasswordRouter = require('./Password')
const DataRouter = require('./renderData')
function checkAuthenticated(req, res, next) {
  if (req.session.user || req.path === '/forgot-password' || req.path === '/reset-password') {
    return next(); // Cho phép truy cập nếu đã đăng nhập hoặc vào các trang cho phép không cần đăng nhập
  }
  res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu không có session
}

function route(app) {

  
  // router login
  app.post("/login", LoginRouter);
  app.get('/login',LoginRouter)
  //router dang nhap loi


  app.get("/loginErr", (req, res) => {
    return res.render("loginErr");
  });


  //router home
  app.get("/",renderData);


  //router dang ky
  app.get("/register",RegisterRouter);
  app.post('/register',RegisterRouter)


  // router trang chi tiet
  app.get('/bds/:id',bdsDetailrouter)

  app.get('/profile',UserProfile)



  app.post("/adminManager", ManagersRouter);
  app.get('/adminManager',ManagersRouter)
  app.get('/adminManager', (req, res) => {
    const successMessage = req.query.message;
    res.render('adminManager', { successMessage });
  });

  
  app.get('/edit/:id',EditRouter)
  app.put('/edit/:id',EditRouter)
  app.delete('/adminManager/:id',EditRouter)
  app.get('/profile/:id',EditProfileRouter)
  app.put('/profile/:id',EditProfileRouter)
  app.delete('/profile/:id',EditProfileRouter)
  app.post('/profile/change-password', checkAuthenticated,EditProfileRouter);


  app.get('/reset-password',PasswordRouter)
  app.get('/forgot-password',PasswordRouter)
  app.post('/reset-password',PasswordRouter)
  app.post('/forgot-password',PasswordRouter)


  app.get("/registerErr", (req, res) => {
    res.render("registerErr");
  });
  app.get("/registerAccpt", (req, res) => {
    res.render("registerAccpt");
  });


  app.get('/trangchu',DataRouter)
  app.post('/trangchu',DataRouter)
}
module.exports = route;
