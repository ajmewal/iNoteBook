const mongoose = require("mongoose")

const mongoUrl = "mongodb://localhost:27017/Inotebook"


const connectMongoose =   async ()=>{
    await mongoose.connect(mongoUrl)
    console.log("connected")
}

module.exports = connectMongoose;