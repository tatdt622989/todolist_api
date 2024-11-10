const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// 取得所有待辦事項
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: '取得待辦事項失敗' });
  }
});

// 新增待辦事項
router.post('/', auth, async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: '請填寫待辦事項名稱' });
    }

    const todo = new Todo({
      title: req.body.title,
      user: req.user._id
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: '新增待辦事項失敗' });
  }
});

// 更新待辦事項
router.patch('/:id', auth, async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: '請填寫待辦事項名稱' });
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: req.body },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: '找不到該待辦事項' });
    }
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: '更新待辦事項失敗' });
  }
});

// 刪除待辦事項
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ 
      _id: req.params.id,
      user: req.user._id
    });
    if (!todo) {
      return res.status(404).json({ error: '找不到該待辦事項' });
    }
    res.json({ message: '刪除成功' });
  } catch (err) {
    res.status(500).json({ error: '刪除待辦事項失敗' });
  }
});

module.exports = router;