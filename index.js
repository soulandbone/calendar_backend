const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

console.log(process.env);

//create express server

const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//Public directory
app.use(express.static('public'));

//Parser and reading of the body
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// TODO: CRUD: Events

// Listen to petitions
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
