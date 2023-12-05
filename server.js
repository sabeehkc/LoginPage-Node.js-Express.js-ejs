const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session")
const {v4:uuidv4} = require("uuid");
const nocache = require("nocache");

const router = require('./router');

const app = express();

const PORT = process.env.PORT || 5001;


app.use(nocache())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');


//load static assets
app.use(express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized: true

}));





app.use('/',router);



app.listen(PORT, ()=>{console.log("Listening to the server on http://localhost:5001")});