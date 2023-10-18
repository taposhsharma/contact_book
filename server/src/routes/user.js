const express = require("express");
const router = express.Router();
const db= require('../db/mongoose')
const userSchema = require('../model/users')

const tenant = require('./auth/tenant')
router.use(tenant)
let User
const useDb =(tenant)=>{
  if(tenant==='domain1'){
    User = db.cluster1Connection.model("User", userSchema);
  }
  else if(tenant==='domain2'){
   User = db.cluster2Connection.model("User", userSchema);
  }

}



// router.get('/dbconnect', async (req,res)=>{
//   const tenant = req.headers.tenant;
    
  
//     // console.log(req.headers)
//   console.log("hello1111",tenant)
//   const mongoose = require('mongoose')


// const url = 'mongodb+srv://tsharma:1234567890@cluster0.b1jpmfg.mongodb.net/contactbook?retryWrites=true&w=majority'

// mongoose
//   .connect(url)
//   .then((client) => {
//     console.log("connected sucessfully");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// })

router.post("/signup", async (req, res) => {
  useDb(req.tenant)
  console.log(req.body);

  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user.getPublicProfile(), token });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  useDb(req.tenant)
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user: user.getPublicProfile(), token });
  } catch (e) {
    
    res.status(400).send({
      msg: e.message,
    });
  }
});
module.exports = router;
