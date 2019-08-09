/*
 * @Description: 通过模型来传递数据
 * @Author: your name
 * @Date: 2019-07-25 15:49:09
 * @LastEditTime: 2019-07-29 13:15:01
 * @LastEditors: Please set LastEditors
 */

//引入mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//创建Schema
const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  identity: {
    type: String,
    require: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
