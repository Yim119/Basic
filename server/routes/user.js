const express = require("express");

const router = express.Router();

const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

const { Memo } = require("../models/Memo");

//====================================================
//                        User
//====================================================

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다.",
        });

      userInfo.genToken((err, userInfo) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", userInfo.token).status(200).json({
          loginSuccess: true,
          userId: userInfo._id,
        });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    role: req.user.role,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    image: req.user.image,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err)
      return res.json({
        logoutSuccess: false,
        err,
      });
    return res.status(200).send({
      logoutSuccess: true,
    });
  });
});

router.post("/api/memos/save", (req, res) => {
  const memo = new Memo(req.body);
  memo.save((err, memoInfo) => {
    if (err) {
      return res.json({ success: false });
    }
    return res.status(200).send({
      success: true,
    });
  });
});

module.exports = router;
