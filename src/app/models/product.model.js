const sequelize = require('../../library/database/connect.mysql');
const { DataTypes } = require('sequelize');

// Định nghĩa tạo ra một bảng Products gồm các trường id, name...
const Products = sequelize.define(
  'Products',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imgSmall: { type: DataTypes.TEXT, allowNull: true },
    imgBig: { type: DataTypes.TEXT, allowNull: true },
    nameProduct: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    goodsInStock: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true } // Chú ý: Sửa từ 'timestamp' thành 'timestamps'
);

// Tạo bảng Products
Products.sync()
  .then(() => {
    console.log('Created successfully');
  })
  .catch((error) => {
    console.log('Error creating table', error);
  });

module.exports = Products;
