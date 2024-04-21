import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      required: true,
    },
    lastLoginDate: {
      type: Date,
      default: null,
    },
  },{
    timestamps:true
  });

  
const Usermodel = mongoose.model('user',userSchema) 

export default Usermodel;