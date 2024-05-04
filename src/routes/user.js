const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = new express.Router();

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send();
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send();
    }

    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse', { expiresIn: '7 days' });
    res.send({ user, token });
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse', { expiresIn: '7 days' });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;