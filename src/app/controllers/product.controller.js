const Product = require('../models/product.model');
const jwt = require('jsonwebtoken');
const sceretKey = require('../../configs/jwt.configs');
const bcrypt = require('bcryptjs');
const Spesc = require('../models/specs.model');
const { Op } = require('sequelize');

class Productscontroller {
  // post tất cả sản phẩm ban đầu
  async handlePostAllProducts(req, res) {
    try {
      const { imgSmall, imgBig, nameProduct, price, color, goodsInStock, content, type } = req.body;
      const result = await Product.bulkCreate(req.body);
      res.status(200).json({ msg: 'Post Products Successfully' });
    } catch (error) {
      //lỗi server
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Add sản phẩm
  async handleAppProducts(req, res) {
    try {
      const { nameProduct, price, color, goodsInStock, content, type } = req.body;
      const imgSmall = req.protocol + '://' + req.get('host') + '/image/' + req.files['imgSmall'][0].filename; // Lấy tên tệp ảnh từ trường imgSmall
      const imgBig = req.protocol + '://' + req.get('host') + '/image/' + req.files['imgBig'][0].filename; // Lấy tên tệp ảnh từ trường imgBig

      // Tạo sản phẩm trong bảng Products
      const product = await Product.create({
        imgSmall,
        imgBig,
        nameProduct,
        price,
        color,
        goodsInStock,
        content,
        type,
      });

      // Lấy id của sản phẩm vừa tạo để sử dụng trong bảng Spescproducts
      const productId = product.id;

      // Tạo thông tin sản phẩm trong bảng Spescproducts
      await Spesc.create({
        product_id: productId,
        manufacturer: req.body.manufacturer,
        caliber: req.body.caliber,
        velocity: req.body.velocity,
        conditions: req.body.conditions,
        ammo_type: req.body.ammo_type,
        actions: req.body.actions,
        barrel_style: req.body.barrel_style,
        fire_mode: req.body.fire_mode,
        gun_weight: req.body.gun_weight,
        loudness: req.body.loudness,
        mechanism: req.body.mechanism,
        Ammo_Weight: req.body.Ammo_Weight,
        Pellet_Shape: req.body.Pellet_Shape,
        Pellet_Quantity: req.body.Pellet_Quantity,
      });

      res.status(200).json({ msg: 'Post Products Successfully' });
    } catch (error) {
      //lỗi server
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // gét tất cả sản phẩm
  async handlegetAllProducts(req, res) {
    try {
      const dataUser = await Product.findAll();
      res.status(200).json({ data: dataUser });
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  // gét sản phẩm theo id
  async handlegetProducts(req, res) {
    try {
      const id = Number(req.params.id);
      const dataUser = await Product.findOne({ where: { id }, include: [{ model: Spesc }] });

      if (dataUser) {
        res.status(200).json({ data: dataUser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  // gét sản phẩm theo type
  async handlegetProductsType(req, res) {
    try {
      const type = req.params.type;
      const dataUser = await Product.findAll({ where: { type } });

      if (dataUser) {
        res.status(200).json({ data: dataUser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  // gét sản phẩm theo khoản giá trị
  async handlegetProductsValue(req, res) {
    try {
      // trường loại hàng nhập vào
      const type = req.params.type.split('-');

      // trường giá nhập vào
      const value = req.params.price;
      const priceRange = value.split('-');

      const minPrice = parseInt(priceRange[0]);
      const maxPrice = parseInt(priceRange[1]);

      const dataUser = await Product.findAll({
        where: {
          type: type,
          price: {
            [Op.between]: [minPrice, maxPrice], // minPrice và maxPrice là khoản giá cần lọc
          },
        },
      });

      if (dataUser) {
        res.status(200).json({ data: dataUser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  // gét sản phẩm theo khoản giá trị velocuty
  async handlegetProductsVelocity(req, res) {
    try {
      // trường loại hàng nhập vào
      const type = req.params.type;

      // trường giá nhập vào
      const value = req.params.velocity;
      const priceRange = value.split('-');

      const minvelocity = parseInt(priceRange[0]);
      const maxvelocity = parseInt(priceRange[1]);
      console.log(maxvelocity);

      const dataUser = await Product.findAll({
        include: [
          {
            model: Spesc,
            // where: {
            //   type: type,
            //   velocity: {
            //     [Op.between]: [minvelocity, maxvelocity], // minPrice và maxPrice là khoản giá cần lọc
            //   },
            // },
          },
        ],
      });

      if (dataUser) {
        res.status(200).json({ data: dataUser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  // giảm số hàng trong kho
  async handleEditquantityProducts(req, res) {
    try {
      const quantityStock = Number(req.params.quantity);
      const id = Number(req.params.id);
      const dataproduct = await Product.findOne({ where: { id } });
      const Stockquantity = dataproduct.dataValues.goodsInStock;
      const newdata = Stockquantity - quantityStock;
      const dataUser = await Product.update({ goodsInStock: newdata }, { where: { id } });

      if (dataUser) {
        res.status(200).json({ message: 'edit successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  // edit sản phẩm
  async handleEditProducts(req, res) {
    try {
      const newdata = req.body;
      const id = Number(req.params.id);
      const dataUser = await Product.update(newdata, { where: { id } });

      if (dataUser) {
        res.status(200).json({ message: 'edit successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  // edit sản phẩm admin
  async handleEditProductsadmin(req, res) {
    try {
      const newdata = req.body;
      const id = Number(req.params.id);

      let imgSmall, imgBig;

      if (req.files && req.files['imgSmall'] && req.files['imgSmall'][0]) {
        imgSmall = req.protocol + '://' + req.get('host') + '/image/' + req.files['imgSmall'][0].filename;
      } else {
        imgSmall = newdata.imgSmall; // Giữ nguyên giá trị từ newdata.imgSmall
      }

      if (req.files && req.files['imgBig'] && req.files['imgBig'][0]) {
        imgBig = req.protocol + '://' + req.get('host') + '/image/' + req.files['imgBig'][0].filename;
      } else {
        imgBig = newdata.imgBig; // Giữ nguyên giá trị từ newdata.imgBig
      }
      const newproduct = {
        imgSmall,
        imgBig,
        nameProduct: req.body.nameProduct,
        price: Number(req.body.price),
        color: req.body.color,
        goodsInStock: Number(req.body.goodsInStock),
        content: req.body.content,
        type: req.body.type,
      };

      const newspec = {
        manufacturer: req.body.manufacturer,
        caliber: Number(req.body.caliber),
        velocity: Number(req.body.velocity),
        conditions: req.body.conditions,
        ammo_type: req.body.ammo_type,
        actions: req.body.actions,
        barrel_style: req.body.barrel_style,
        fire_mode: req.body.fire_mode,
        gun_weight: Number(req.body.gun_weight),
        loudness: Number(req.body.loudness),
        mechanism: req.body.mechanism,
        Ammo_Weight: Number(req.body.Ammo_Weight),
        Pellet_Shape: req.body.Pellet_Shape,
        Pellet_Quantity: req.body.Pellet_Quantity,
      };

      const product = await Product.update(newproduct, { where: { id } });

      await Spesc.update(newspec, { where: { id } });

      res.status(200).json({ msg: 'Post Products Successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // xóa sản phẩm
  async handledeleteProducts(req, res) {
    try {
      const id = Number(req.params.id);
      const dataUser = await Product.destroy({ where: { id } });
      res.status(200).json({ message: 'DELETE successfully' });
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }
}

module.exports = new Productscontroller();
