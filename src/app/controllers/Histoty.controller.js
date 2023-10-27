const history = require('../models/History.model');
const orders = require('../models/Orders.model');
const Users = require('../models/user.model');
const Products = require('../models/product.model');
const CartItem = require('../models/CartItem.model');
const { Op } = require('sequelize');

class Historycontroller {
  async handleposthistory(req, res) {
    try {
      // Lưu dữ liệu vào bảng "History"
      const newHistory = await history.bulkCreate(req.body);

      // Trả về kết quả thành công và dữ liệu đã được lưu
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async handlegethistory(req, res) {
    try {
      const Users_id = Number(req.params.id);
      console.log(Users_id);
      const dataHistory = await history.findAll({
        where: { Users_id },
        include: [{ model: Users }, { model: Products }],
      });
      if (dataHistory) {
        res.status(200).json({ data: dataHistory });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  async handlegetallhistory(req, res) {
    try {
      const dataHistory = await history.findAll({
        order: [['createdAt', 'DESC']],
        include: [{ model: Users }, { model: Products }],
      });
      if (dataHistory) {
        res.status(200).json({ data: dataHistory });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  async handlepoststatushistory(req, res) {
    try {
      const History_id = Number(req.params.id);
      const dataHistory = await history.findAll({
        where: { History_id },
      });
      if (dataHistory) {
        const [findata] = dataHistory;
        const newdata1 = findata.dataValues;
        console.log(newdata1);
        const newdata = (newdata1.Status_history = 2);
        await history.update({ Status_history: newdata }, { where: { History_id } });
        res.status(200).json({ data: dataHistory });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  async handlegethistorywithmonth(req, res) {
    try {
      const data = req.params.month;
      const dataHistory = await history.findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(`2023-${data}-01T00:00:00.000Z`), // Ngày bắt đầu của tháng
            [Op.lt]: new Date(`2023-${data}-01T00:00:00.000Z`).setMonth(data), // Ngày kết thúc của tháng (bắt đầu tháng tiếp theo)
          },
        },
        include: [{ model: Users }, { model: Products }],
      });

      if (dataHistory) {
        res.status(200).json({ data: dataHistory });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }
}

module.exports = new Historycontroller();
