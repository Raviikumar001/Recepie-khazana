const mongoose = require('mongoose');

const connectDB = (url)=> {
    return mongoose.connect(url, {
        dbName: 'Recipes'
    })
}

module.exports =  connectDB;