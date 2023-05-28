// initializing the server and connecting to the database,

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Define routes and middleware here

// listen the changes of this file on port 3000
app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

require('dotenv').config();
const mongoString = process.env.DATABASE_URL;

//import the contents of our .env file
mongoose.connect(mongoString);
const database = mongoose.connection

// success or an error message depending on whether our database connection is successful or fails
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// import routes file 
const routes = require('./routes/routes');
// use the routes file
app.use('/', routes);