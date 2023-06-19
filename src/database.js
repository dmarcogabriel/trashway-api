const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://gabriel:Y3eABHt5svmllE8v@cluster0.bkb6b.mongodb.net/trashway?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    console.log('db connected');
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = connect;