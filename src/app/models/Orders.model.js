const sequelize = require('../../library/database/connect.mysql');
const { DataTypes } = require('sequelize');
const Users = require('../models/user.model');
const products = require('../models/product.model');

// Định nghĩa tạo ra một bảng Products gồm các trường id, name...
const Orders = sequelize.define('Orders', {
  Orders_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Users_id: { type: DataTypes.INTEGER, allowNull: false },
  status_orders: { type: DataTypes.INTEGER, defaultValue: 1 },
});
Orders.belongsTo(Users, { foreignKey: 'Users_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Users.hasOne(Orders, { foreignKey: 'Users_id' });
// Tạo bảng Products
Orders.sync()
  .then(() => {
    console.log('Created successfully');
  })
  .catch((error) => {
    console.log('Error creating table', error);
  });

module.exports = Orders;
