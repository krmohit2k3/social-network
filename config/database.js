const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then( ()=>{console.log("Database is connected successfully")})
    .catch( (err)=>{
        console.log("recieved error in connecting databse");
        console.log(err.message);
        process.exit(1);
    })
}

module.exports = connectWithDb;