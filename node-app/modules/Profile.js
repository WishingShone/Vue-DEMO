/*
 * @Description: 通过模型来传递数据
 * @Author: your name
 * @Date: 2019-07-25 15:49:09
 * @LastEditTime: 2019-07-29 13:34:36
 * @LastEditors: Please set LastEditors
 */

//引入mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//创建Schema
const profileSchema = new Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: {
    type: String,
    require: true
  },
  expand: {
    type: String,
    require: true
  },
  cash: {
    type: String
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", profileSchema);
