const express = require('express');
const routers = express.Router();
const controller = require('../controllers/product.controller');
const upload = require('../middlewares/uploadimage.middlewares');

// POST toàn bộ sản phẩm lên ban đầu
routers.post('/postallproducts', controller.handlePostAllProducts);

// ADD SẢN PHẨM
routers.post('/addproducts', upload.s, controller.handleAppProducts);

// lấy toàn bộ sản phẩm về render trang chủ
routers.get('/getallproducts', controller.handlegetAllProducts);

// lấy 1 sản phẩm theo id
routers.get('/getproducts/:id', controller.handlegetProducts);

// lấy 1 sản phẩm theo type
routers.get('/getproductstype/:type', controller.handlegetProductsType);

// lấy 1 sản phẩm theo value là trường price
routers.get('/getproductvalue/:type/:price', controller.handlegetProductsValue);

// lấy 1 sản phẩm theo value là trường velocity
routers.get('/getproductvelocity/:type/:velocity', controller.handlegetProductsVelocity);

// SỬA SẢN PHẨM
routers.patch('/editproducts/:id', controller.handleEditProducts);

// EDIT SẢN PHẨM THEO ID
routers.patch('/editproductsadmin/:id', upload.s, controller.handleEditProductsadmin);

// xóa sản phẩm
routers.delete('/deleteproducts/:id', controller.handledeleteProducts);

// sửa số sản phẩm trong kho
routers.patch('/editquantityproducts/:quantity/:id', controller.handleEditquantityProducts);

module.exports = routers;
