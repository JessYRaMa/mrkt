const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3001;


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mrktserver");

mongoose.connection.on('error', err => {
  console.log(`DB connection err: ${err.message}`)  
})

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator());
app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function(err, req, res, next){
    if(err.name === "UnauthorizedError"){
        res.status(401).json({error: "Unauthorized"});
    }
})


const port = 8080
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
  