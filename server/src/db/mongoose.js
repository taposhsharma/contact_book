
const mongoose = require('mongoose')




const url1 = 'mongodb+srv://tsharma:1234567890@cluster0.b1jpmfg.mongodb.net/contactbook?retryWrites=true&w=majority'
const url2 = 'mongodb+srv://tsharma:1234567890@cluster0.brw0brz.mongodb.net/contactbook2?retryWrites=true&w=majority'


const cluster1Connection = mongoose.createConnection(url1, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
cluster1Connection.on('connected', () => {
  console.log('Cluster1 to the database');
});

// If there's an error during the connection
cluster1Connection.on('error', (err) => {
  console.error(`Connection error: ${err}`);
});


const cluster2Connection = mongoose.createConnection(url2, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
cluster2Connection.on('connected', () => {
  console.log('Cluster 2 to the database');
});

// If there's an error during the connection
cluster2Connection.on('error', (err) => {
  console.error(`Connection error: ${err}`);
});












module.exports = {
 
cluster1Connection,
cluster2Connection}