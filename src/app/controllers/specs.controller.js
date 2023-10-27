const Specs = require('../models/specs.model');
const jwt = require('jsonwebtoken');
const sceretKey = require('../../configs/jwt.configs');
const bcrypt = require('bcryptjs');

class Productscontroller {
  async handlePostAllspecs(req, res) {
    try {
      const result = await Specs.bulkCreate(req.body);
      res.status(200).json({ msg: 'Post Products Successfully' });
    } catch (error) {
      //lỗi server
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new Productscontroller();
