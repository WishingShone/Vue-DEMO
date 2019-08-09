/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-25 15:28:00
 * @LastEditTime: 2019-08-09 17:31:33
 * @LastEditors: Please set LastEditors
 */
//验证登录login和注册register
const express = require("express");
const router = express.Router();
const User = require("../../modules/user");

//加密密码
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const passport = require("passport");
//$route 使用的GET请求 请求目录为api/users/test
//@desc 返回请求的json数据
//@access 这个接口是公开的还是私有的借口 目前是public
router.get("/test", (req, res) => {
  res.json({
    msg: "已登录"
  });
});

//$route 使用的POST请求 请求目录为api/users/register 安装body-parser
//@desc 返回请求的json数据
//@access 这个接口是公开的还是私有的借口 目前是public
router.post("/register", (req, res) => {
  console.log("发送请求");
  //查询数据库中是否拥有邮箱
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json("邮箱已被占用");
    } else {
      //全球公认头像
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //图片格式
        d: "mm" //有头像
      });
      //加密password，安装bcrypt
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity: req.body.identity
      });
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          } else {
            newUser.password = hash;

            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          }
        });
      });
    }
  });
});

//$route 使用的POST请求 请求目录为api/users/login
//@desc  返回token jwt passport
//@access 这个接口是公开的还是私有的借口 目前是public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //先匹配email再匹配password
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json("用户不存在");
    }
    //密码匹配
    else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //匹配成功,返货token,先安装jsonwebtoken cnpm install jsonwebtoken --save
          //jwt.sign("规则","加密名字","过期时间","箭头函数")
          const rule = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            identity: user.identity
          };
          jwt.sign(
            rule,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token //必须是Bearer[空格]前缀的token才能被验证
              });
            }
          );
          // res.json({
          //   msg: "success"
          // });
        } else {
          return res.status(400).json("密码错误");
        }
      });
    }
  });
});

//$route 使用的POST请求 请求目录为api/users/current
//@desc  返回当前用户
//@access 这个接口是公开的还是私有的借口 private
//验证使用passport cnpm install passport-jwt --save,cnpm install passport --save
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //返回的用户信息
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      identity: req.user.identity
    });
  }
);

//引出users
module.exports = router;
