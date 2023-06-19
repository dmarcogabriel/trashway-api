const UserModel = require('../models/User');

module.exports = {
  async login(req, res) {
    const {email, password} = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(400).json({
          message: 'E-mail ou senha incorretos!',
          data: { auth: false },
        });
        return;
      }

      const userModel = new UserModel(user);

      if (!userModel.validateHash(password)) {
        res.status(400).json({
          message: 'E-mail ou senha incorretos!',
          data: { auth: false },
        });
        return;
      }

      const id = userModel._id;
      const token = user.generateAccessToken(id);

      res.status(200).json({
        message: 'Logou ae carai',
        data: {
          auth: true,
          token,
          userId: id,
        },
      });
    } catch (error) {
      res.status(500).send({
        message: 'Falha na autenticação',
        data: { error },
      });
    }
  }
};