const validator = require("validator");
const mongoose = require("mongoose");

const { urlencoded } = require("express");


const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
      },
      lastname: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Email is invalid!");
          }
        },
      },
      mobileno:{
          type: String,
       
          required: true,
          minlength: 10,
          trim: true,
      },
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      }
})





module.exports = contactSchema