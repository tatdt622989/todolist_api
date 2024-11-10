const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 註冊
router.post('/register', async (req, res) => {
  try {
    const { email, password,name } = req.body;

    if (!email || !password || !name) {
      throw new Error('請填寫所有欄位');
    }

    // 檢查 email 是否已經被註冊
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('此 email 已經被註冊');
    }

    const newUser = new User({ email, password, name });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message || '註冊失敗' });
  }
});

// 登入
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: '登入失敗' });
  }
});

module.exports = router;