const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//引入token验证模块
const passport = require("passport");

const App = express();

//引入users.js
const users = require("./routers/api/users");

//引入profiles
const profiles = require("./routers/api/profiles");

//mongodb配置
const db = require("./config/keys").mongoURI;

//使用body-parser中间件
App.use(
  bodyParser.urlencoded({
    extended: false
  })
);
App.use(bodyParser.json());

//连接到mobgodb
mongoose
  .connect(db)
  .then(() => {
    console.log("mongodb已连接");
  })
  .catch(err => {
    console.log(err);
  });
//设置根路由
App.get("/", (req, res) => {
  res.send("Hello World!");
});

//passport初始化
App.use(passport.initialize());
//传递passport到passport.js来使用
require("./config/passport")(passport);

//使用router
App.use("/api/users", users);
App.use("/api/profiles", profiles);

const port = process.env.PORT || 5000;

App.listen(port, () => {
  console.log("服务已经启动，端口号:" + port);
});
