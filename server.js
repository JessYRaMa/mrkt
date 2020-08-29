const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8080;
// const PORT = 8080;


const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator());
app.use(cors());


app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function(err, req, res, next){
    if(err.name === "UnauthorizedError"){
        res.status(401).json({error: "Unauthorized"});
    }
})


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname , 'client', 'build', 'index.html'))
  })
}

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mrktserver";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});


app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
  