const express = require('express')

const bodyParser = require("body-parser");
const tenant = require('./routes/auth/tenant')
const {  
    cluster1Connection,
    cluster2Connection
} = require('./db/mongoose')

const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(tenant)

app.use('/users',require('./routes/user'))

app.use('/contact',require('./routes/contact'))

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`)
})