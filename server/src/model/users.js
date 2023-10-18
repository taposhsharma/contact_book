const validator = require("validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const { urlencoded } = require("express");

const {  
  cluster1Connection,
  cluster2Connection
} = require('../db/mongoose')
const userSchema = new mongoose.Schema(
  {
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
      unique: true,
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
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      // validate(value){
      //     if(value){

      //     }
      // }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  // console.log(email)
  if (!user) {
    throw new Error("UnaBle to find user");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismytoken");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Hash the plain text password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = cluster1Connection.model("User", userSchema);

module.exports = userSchema;