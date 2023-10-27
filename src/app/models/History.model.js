const sequelize = require('../../library/database/connect.mysql');
const { DataTypes } = require('sequelize');
const Orders = require('../models/Orders.model');
const CartItem = require('../models/CartItem.model');
const Users = require('../models/user.model');
const Products = require('../models/product.model');

// Định nghĩa tạo ra một bảng History gồm các trường id, name...
const History = sequelize.define('History', {
  History_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Orders_id: { type: DataTypes.INTEGER, allowNull: false },
  CartItem_id: { type: DataTypes.INTEGER, allowNull: false },
  Users_id: { type: DataTypes.INTEGER, allowNull: false },
  Product_id: { type: DataTypes.INTEGER, allowNull: false },
  Total_Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  Quantity: { type: DataTypes.INTEGER, allowNull: false },
  Payment: { type: DataTypes.STRING, allowNull: false },
  Status_history: { type: DataTypes.INTEGER, defaultValue: 1 },
});
History.belongsTo(Users, { foreignKey: 'Users_id' });
Users.hasMany(History, { foreignKey: 'Users_id' });

History.belongsTo(Products, { foreignKey: 'Product_id' });
Products.hasMany(History, { foreignKey: 'Product_id' });

// Tạo bảng Products
History.sync()
  .then(() => {
    console.log('Created successfully');
  })
  .catch((error) => {
    console.log('Error creating table', error);
  });

module.exports = History;
