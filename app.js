const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require("morgan");

const config = require('./config/database')

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('database error' + err);
});

const app = express();

const users = require('./routes/users');

//Morgan Middleware
app.use(logger('dev'));

//CORS Middleware
app.use(cors());

//Port Number
const port = process.env.PORT || 8080;

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users',users);

//Index Route
app.get('/', (req,res) => {
  res.send('Invalid Endpoint')
});

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(port, () => {
  console.log('server started on port ' + port);
});
