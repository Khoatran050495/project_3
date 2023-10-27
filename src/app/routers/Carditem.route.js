const express = require('express');
const routers = express.Router();
const controller = require('../controllers/Carditem.controller');

// thêm sản phẩm vào giỏ
routers.post('/postcarditem/:product_id/:id', controller.postCarditem);

// trừ sản phẩm vào giỏ
routers.post('/minuscarditem/:product_id/:id', controller.minusCartItem);

// delete sản phẩm từng sản phẩm
routers.delete('/deletecarditem/:product_id/:id', controller.DeleteCartItem);

// delete hết bảng sản phẩm
routers.delete('/deletecarditemall/:id', controller.DeleteCartItemall);

module.exports = routers;
