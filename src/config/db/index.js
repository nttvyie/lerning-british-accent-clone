const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://nttvy27:thuyvy363959@cluster0.kh2r2md.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect MongoDB successfully!!!')
    } catch (error) {
        console.log('Connect MongoDB failure!!!')
    }
}

mongoose.set('strictQuery', true);

module.exports = { connect }

