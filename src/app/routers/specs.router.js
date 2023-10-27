const express = require('express');
const routers = express.Router();
const controller = require('../controllers/specs.controller');

// POST toàn bộ sản phẩm lên ban đầu
routers.post('/postallspecs', controller.handlePostAllspecs);

module.exports = routers;
