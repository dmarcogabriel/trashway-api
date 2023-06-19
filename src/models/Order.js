const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: false },
  weight: { type: Number, required: true },
  address: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() },
});

module.exports = model('Order', OrderSchema);