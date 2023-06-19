const UserModel = require('../models/User');
const OrderModel = require('../models/Order');
// const omit = require('lodash/omit')

module.exports = {
  async getById(req, res) {
    const user = await UserModel.findById(req.params.id);
    const orders = await OrderModel.where({ user: user.id });

    res.send({ 
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      cpf: user.cpf,
      cnpj: user.cnpj,
      email: user.email,
      orders: orders,
    });
  },
  async post(req, res) {
    const user = new UserModel(req.body);
    user.password = user.generateHash(req.body.password);
    await user.save();
    res.send(user._id);
  },
  async update(req, res) {
    const user = await UserModel.findById(req.params.id);
    const data = req.body;
    user.firstName = data.firstName || user.firstName;
    user.lastName = data.lastName || user.lastName;
    user.phone = data.phone || user.phone;
    
    await user.save();
    res.send(user._id);
  }
};