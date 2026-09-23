const mongoose = require("mongoose")

const connectDatabase =()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("MongoDB connected successfully");
        
    })
    .catch((error)=>{
        console.log("MongoDB connection failed:", error.message);
    })
}
module.exports = connectDatabase