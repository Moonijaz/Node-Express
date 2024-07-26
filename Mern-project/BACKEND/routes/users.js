const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const userList = await User.find();
        res.send(userList);
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

router.post('/', async (req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        });
        user = await user.save();
        res.send(user);
    } catch (error) {
        res.status(404).send('The order cannot be created');
    }
});

module.exports = router;
