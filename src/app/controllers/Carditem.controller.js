const Orders = require('../models/Orders.model');
const carditems = require('../models/CartItem.model');
const { Op } = require('sequelize');

class Productscontroller {
  // Add sản phẩm
  async postCarditem(req, res) {
    try {
      // lấy user id
      const Users_id = Number(req.params.id);

      // lấy product id
      const Product_id = Number(req.params.product_id);

      // tìm Order id
      const result = await Orders.findAll({ where: { Users_id } });
      const [firstOrder] = result;
      const { Orders_id } = firstOrder.dataValues;

      // tìm CartItem
      const fineCartItem = await carditems.findAll({
        where: {
          [Op.and]: [{ Product_id: Product_id }, { Orders_id: Orders_id }],
        },
      });

      if (fineCartItem.length > 0) {
        const [fineCart] = fineCartItem;
        const data = fineCart.dataValues;
        const newdata = data.Quantity + 1;
        await carditems.update({ Quantity: newdata }, { where: { Product_id, Orders_id } });
        res.status(200).json({ msg: 'Post Products Successfully' });
      } else if (fineCartItem.length === 0) {
        const newdata = {
          Quantity: 1,
          Product_id: Product_id,
          Orders_id: Orders_id,
        };
        const addproduct = await carditems.create(newdata);
        res.status(200).json({ msg: 'Post Products Successfully' });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      //lỗi server
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async minusCartItem(req, res) {
    try {
      const Users_id = Number(req.params.id);

      // lấy product id
      const Product_id = Number(req.params.product_id);

      // tìm Order id
      const result = await Orders.findAll({ where: { Users_id } });
      const [firstOrder] = result;
      const { Orders_id } = firstOrder.dataValues;

      // tìm CartItem
      const fineCartItem = await carditems.findAll({
        where: {
          [Op.and]: [{ Product_id: Product_id }, { Orders_id: Orders_id }],
        },
      });
      const [fineCart] = fineCartItem;
      const data = fineCart.dataValues;
      const quantity = data.Quantity;
      if (quantity > 1) {
        const newdata = data.Quantity - 1;
        await carditems.update({ Quantity: newdata }, { where: { Product_id, Orders_id } });

        res.status(200).json({ msg: 'Post Products Successfully' });
      } else {
        await carditems.destroy({ where: { Product_id, Orders_id } });
        res.status(200).json({ msg: 'Product Removed from Cart' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async DeleteCartItem(req, res) {
    try {
      const Users_id = Number(req.params.id);

      // lấy product id
      const Product_id = Number(req.params.product_id);

      // tìm Order id
      const result = await Orders.findAll({ where: { Users_id } });
      const [firstOrder] = result;
      const { Orders_id } = firstOrder.dataValues;

      await carditems.destroy({ where: { Product_id, Orders_id } });
      res.status(200).json({ msg: 'Product Removed from Cart' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async DeleteCartItemall(req, res) {
    try {
      const Users_id = Number(req.params.id);

      // tìm Order id
      const result = await Orders.findAll({ where: { Users_id } });
      const [firstOrder] = result;
      const { Orders_id } = firstOrder.dataValues;
      console.log(1111111111111, Orders_id);
      await carditems.destroy({ where: { Orders_id } });
      res.status(200).json({ msg: 'Product Removed from Cart' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new Productscontroller();
