const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');
const jwt =  require('jsonwebtoken');

const EXPIRATION_TIME = 60000;
const SECRET_HASH = 'trashway';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  cpf: { type: String, required: false },
  cnpj: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() },
});

UserSchema.methods
  .generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync());

UserSchema.methods.validateHash = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods
  .generateAccessToken = (id) => jwt.sign({ id }, SECRET_HASH || '', {
    expiresIn: EXPIRATION_TIME,
  });

UserSchema.statics.findWithOrder = async function (id) {
  const user = await this.findById(id).exec();
  return null;
};

module.exports = model('User', UserSchema);