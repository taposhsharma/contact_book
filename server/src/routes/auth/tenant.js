function tenant(req, res, next) {
    const tenant = req.headers.tenant;
    
    if(tenant){
        req.tenant = tenant
        next()
    }else{
       res.status(400).send({msg:'Domain is missing'})
    }
    // console.log(req.headers)


  }
  
  module.exports = tenant;