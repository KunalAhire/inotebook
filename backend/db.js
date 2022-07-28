const mongoose = require('mongoose');
const mogoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = () =>{
    mongoose.connect(mogoURI, ()=>{
        console.log("mogoDb Connnected success.");
    })
}

module.exports = connectToMongo;