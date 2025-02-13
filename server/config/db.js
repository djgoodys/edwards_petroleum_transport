const mongoose = require('mongoose');
const User = require('../models/userModel');
const { MongoClient, ServerApiVersion } = require('mongodb');
//const dbURI = "mongodb+srv://edwards:PHax9g5nhQOoqMBg@cluster0.mz4nm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbURI = "mongodb+srv://edwards:PHax9g5nhQOoqMBg@cluster0.mz4nm.mongodb.net/edwards?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(dbURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

// Configuration options for Mongoose (without deprecated options)
const options = {
  connectTimeoutMS: 30000,  // Increase connection timeout to 30 seconds
  socketTimeoutMS: 30000    // Increase socket timeout to 30 seconds
};

// Connect to MongoDB
mongoose.connect(dbURI, options);
//LOG FILE LOCATION C:\Program Files\MongoDB\Server\8.0\log\
// Event listeners for MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error: ' + err);
  process.exit(1);  // Exit process on database connection error
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected');
});

// Export the Mongoose connection to use in other parts of your app
module.exports = mongoose;
