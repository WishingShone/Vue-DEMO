const express = require("express");
const App = express();
//设置根路由
App.get("/", (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 5000;

App.listen(port, () => {
  console.log("服务已经启动，端口号:" + port);
});
