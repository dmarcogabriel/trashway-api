const OrderModel = require('../models/Order');

module.exports = {
  async findAll(_, res) {
    res.send(await OrderModel.find());
  },
  async postOrder(req, res) {
    const order = new OrderModel(req.body);

    await order.save();
    res.send(order._id);
  }
};