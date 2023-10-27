const sequelize = require('../../library/database/connect.mysql');
const { DataTypes } = require('sequelize');
const Orders = require('../models/Orders.model');
const product = require('../models/product.model');

// Định nghĩa tạo ra một bảng Products gồm các trường id, name...
const CartItem = sequelize.define('CartItem', {
  CartItem_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Quantity: { type: DataTypes.INTEGER, allowNull: true },
  Product_id: { type: DataTypes.INTEGER, allowNull: false },
  Orders_id: { type: DataTypes.INTEGER, allowNull: false },
});

CartItem.belongsTo(product, { foreignKey: 'Product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
product.hasMany(CartItem, { foreignKey: 'Product_id' });
CartItem.belongsTo(Orders, { foreignKey: 'Orders_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Orders.hasMany(CartItem, { foreignKey: 'Orders_id' });

// Tạo bảng Products
CartItem.sync()
  .then(() => {
    console.log('Created successfully');
  })
  .catch((error) => {
    console.log('Error creating table', error);
  });

module.exports = CartItem;
