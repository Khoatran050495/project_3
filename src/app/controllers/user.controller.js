const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const sceretKey = require('../../configs/jwt.configs');
const bcrypt = require('bcryptjs');

class Usercontroller {
  async handleregister(req, res) {
    // get username,password ở body
    const { username, email, passwords, phoneNumber, birthday, address } = req.body;
    try {
      // kiểm tra xem username tồn tại chưa
      const userName = await User.findOne({ where: { username } });
      if (userName) {
        // nếu tồn tại thì báo lỗi
        return res.status(400).json({ msg: 'Username already exists' });
      }
      // trường hợp ko tồn tại thì thực hiện
      const saltRounds = 10; //độ an toàn mã hóa password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(passwords, salt); //hàm băm password==> mã hóa password
      const user = await User.create({ ...req.body, passwords: hashedPassword }); //insert dữ liệu,password = password đã mã hóa
      res.status(200).json({ msg: 'Register Successfully', user: user });
    } catch (error) {
      //lỗi server
      console.error('Error handling register:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async handlelogin(req, res) {
    const { username, passwords } = req.body;
    try {
      const dataUser = await User.findOne({ where: { username } });
      if (dataUser) {
        const mypassword = await bcrypt.compare(passwords, dataUser.passwords);
        if (mypassword) {
          const accessToken = jwt.sign(dataUser.dataValues, sceretKey);
          res.status(200).json({
            data: dataUser,
            accessToken,
          });
        } else {
          res.status(401).json({ message: 'User account or password incorrect' });
        }
      } else {
        res.status(401).json({ message: 'User account or password incorrect' });
      }
    } catch (error) {
      res.status(404).json(error);
    }
  }

  async handlegetAlluser(req, res) {
    try {
      const dataUser = await User.findAll();
      res.status(200).json({ data: dataUser });
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  async handleEditUser(req, res) {
    try {
      const newdata = req.body;
      const id = Number(req.params.id);
      const dataUser = await User.update(newdata, { where: { id } });

      if (dataUser) {
        res.status(200).json({ message: 'edit successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }
}

module.exports = new Usercontroller();
