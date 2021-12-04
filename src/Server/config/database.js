const mongoose = require('mongoose');
const env = require('dotenv');
env.config() //a
require()
async function connect() { 
    try {
        
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.an7m2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
           useNewUrlParser: true,
           useUnifiedTopology: true
        });
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure!');
    }
}

module.exports = { connect };