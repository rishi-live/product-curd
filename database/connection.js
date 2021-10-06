const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database Connected');
  } catch (error) {
    console.log('Database Connectivity Error', error);
    throw new Error(error);
  }
}