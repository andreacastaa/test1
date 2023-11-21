

const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://test:test@cluster0.2iwyx.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connesso a MongoDB');
  } catch (err) {
    console.error('Non è stato possibile connettersi a MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
