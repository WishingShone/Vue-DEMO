//验证登录login和注册register
const express = require("express");
const router = express.Router();
const Profile = require("../../modules/Profile");

const passport = require("passport");

//$route post api/proflies/add
//@desc 创建信息接口
//@access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expand) profileFields.expand = req.body.expand;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then(profile => {
      res.json(profile);
    });
  }
);

//$route GET api/proflies
//@desc 获取所有信息
//@access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .then(profile => {
        if (!profile) {
          return res.status(404).json("无内容");
        } else {
          res.json(profile);
        }
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

//$route GET api/proflies/:id
//@desc 获取单个信息
//@access private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json("无内容");
        } else {
          res.json(profile);
        }
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

//$route post api/proflies/edit/:id
//@desc 编辑信息接口
//@access private
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expand) profileFields.expand = req.body.expand;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields }, //更新的内容
      { new: true } //是否为新的内容
    ).then(profile => {
      res.json(profile);
    });
  }
);

//$route delete api/proflies/delete/:id
//@desc 删除信息接口
//@access private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
      .then(profile => {
        profile.save().then(profile => {
          res.json("删除成功");
        });
      })
      .catch(err => {
        res.status(404).json("删除失败");
      });
  }
);

//引出profiles
module.exports = router;
