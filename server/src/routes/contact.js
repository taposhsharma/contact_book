const express = require("express");
const router = express.Router();
const db= require('../db/mongoose')
const contactSchema = require("../model/contact");
router.use(require('./auth/authUser'))

const tenant = require('./auth/tenant')
router.use(tenant)
let Contact
const useDb =(tenant)=>{
  if(tenant==='domain1'){
    Contact = db.cluster1Connection.model("Contact", contactSchema);
  }
  else if(tenant==='domain2'){
   Contact = db.cluster2Connection.model("Contact", contactSchema);
  }

}


router.post("/addcontact", async (req, res) => {
useDb(req.tenant)
    console.log(req.body)
    let newContact = {
        ...req.body,
        userId:req.id
    }
    const contact= new Contact(newContact)
    //  console.log(contact)

    try {
      const existingContact = await Contact.find({mobileno:req.body.mobileno,userId:req.id})
      console.log(existingContact)
      if(existingContact.length>0){
        res.status(201).send({msg:"Number already exists"})
      }
      else{
        await contact.save();
       
        res.status(201).send({ msg:"Contact Saved Successfully",next:true});
      }
        
      } catch (err) {
        res.status(400).send(err);
        console.log(err);
      }
});


router.get('/allcontact', async (req,res)=>{
  useDb(req.tenant)
  try{
      const contact = await Contact.find({userId:req.id})
      console.log(contact)

      res.status(200).send(contact)
  }catch(error){


    console.log(error)

    res.status(400).send({msg:"Not able to fetch records"})
  }
})



router.post('/delete', async (req,res)=>{
  useDb(req.tenant)
  console.log(req.body)

  const { id } = req.body

  try {
    
    const result = await Contact.deleteOne({ _id: id, userId: req.id });

    if (result.deletedCount === 1) {
      console.log('Document deleted successfully');
      res.status(200).send({msg: "Deleted Successfully"})
    } else {
      res.status(200).send({msg: "Contact not found"})
    }
  } catch (error) {
     res.status(400).send(error)
  }
})

router.get("/:id", async (req, res) => {
  useDb(req.tenant)
  try {
    const id = req.params.id;
    const contact = await Contact.findOne({ _id: id });
    console.log(contact);

    res.status(200).send(contact);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/update', async (req,res)=>{
  useDb(req.tenant)
  console.log(req.body)

  const{firstname,lastname,email,mobileno,id}= req.body
  try {
   const result = await Contact.updateOne({_id:id},{$set:{firstname:firstname,lastname:lastname,email:email,mobileno:mobileno}})
   console.log(result)
   res.status(200).send({msg:'Updated Successfully'});
  }catch(err){
    console.log(err)
    res.status(400).send(err)
  }
})


module.exports = router;
