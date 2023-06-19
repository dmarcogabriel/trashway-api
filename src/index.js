const express = require('express');
const cors = require('cors');
const connect = require('./database');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');

const app = express();

app.use(cors());
app.use(express.json());

// Users
app.post('/users', userController.post);
app.get('/users/:id', userController.getById);
app.put('/users/:id', userController.update);

//Auth
app.post('/auth', authController.login);

app.post('/orders', orderController.postOrder);
app.get('/orders', orderController.findAll);

(async () => {
  await connect();
  app.listen(4444, () => console.log('running'));
})();