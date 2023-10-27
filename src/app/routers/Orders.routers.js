const express = require('express');
const routers = express.Router();
const controller = require('../controllers/orders.controller');

// tạo order (Giỏ Hàng)
routers.post('/postorders', controller.handlepostorders);

// gets orders
routers.get('/getorders/:id', controller.handlegetorders);

module.exports = routers;
