const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email :{
        type:String,
        required:true,
    },
});

userSchema.plugin(passportLocalMongoose);  //It can automatically implement the username,hashing,salting,hash_password

module.exports = mongoose.model("User",userSchema);