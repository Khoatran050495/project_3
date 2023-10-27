const orders = require('../models/Orders.model');
const Users = require('../models/user.model');
const Products = require('../models/product.model');
const CartItem = require('../models/CartItem.model');

class Usercontroller {
  // tạo thẻ orders khi đăng ký
  async handlepostorders(req, res) {
    try {
      const result = await orders.create(req.body);
      res.status(200).json({ msg: 'Post Products Successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async handlegetorders(req, res) {
    try {
      const Users_id = Number(req.params.id);
      const dataOrder = await orders.findAll({
        where: { Users_id },
        include: [{ model: Users }, { model: CartItem, include: [{ model: Products }] }],
      });
      if (dataOrder) {
        res.status(200).json({ data: dataOrder });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }
}

module.exports = new Usercontroller();
