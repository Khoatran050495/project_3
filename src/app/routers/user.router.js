const express = require('express');
const routers = express.Router();
const controller = require('../controllers/user.controller');

routers.post('/register', controller.handleregister);

routers.post('/login', controller.handlelogin);

routers.get('/getalluser', controller.handlegetAlluser);

routers.patch('/patchuser/:id', controller.handleEditUser);

module.exports = routers;
