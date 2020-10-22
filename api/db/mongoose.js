const mongoose = require("mongoose");

//setting mongoose promise to js global promise
mongoose.Promise = global.Promise;

// Loading the mongoose models

mongoose.connect("mongodb://localhost:27017/test",{useNewUrlParser:true}).then(()=>{
    console.log("Connected to MongoDB successfull");
}).catch((e)=>{
    console.log("Error while connecting to mongoDB");
    console.log(e);
});

// to prevent deprectation warning (from MongoDB native driver)
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

module.exports={
    mongoose
}