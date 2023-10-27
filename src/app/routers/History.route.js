const express = require('express');
const routers = express.Router();
const controller = require('../controllers/Histoty.controller');

// post lên history
routers.post('/posthistory', controller.handleposthistory);

// get history về theo id
routers.get('/posthistory/:id', controller.handlegethistory);

// get history về theo tháng
routers.get('/gethistorywithmonth/:month', controller.handlegethistorywithmonth);

// get history về
routers.get('/getallhistory', controller.handlegetallhistory);

// post status history
routers.patch('/poststatushistory/:id', controller.handlepoststatushistory);

module.exports = routers;
