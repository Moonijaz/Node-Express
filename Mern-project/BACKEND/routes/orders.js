const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
    try {
        const orderList = await Order.find();
        res.send(orderList);
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

router.post('/', async (req, res) => {
    try {
        let order = new Order({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        });
        order = await order.save();
        res.send(order);
    } catch (error) {
        res.status(404).send('The order cannot be created');
    }
});

module.exports = router;
