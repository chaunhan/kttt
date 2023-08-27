const express = require("express")
const app = express()
const dotenv = require('dotenv');
const path = require("path")
const bodyParser = require("body-parser");
const session = require('express-session')

const port = 80

// Import routes
const indexRoutes = require("./routes/index");
const cController = require("./routes/cRoute");
const uController = require("./routes/uRoute");
const authRotes = require("./routes/aRouth");


//// kết nối CSDL/////
var db = require('mongoose');
const { default: mongoose } = require('mongoose');
var url = "mongodb+srv://ghuyngo:Lich5cnbk@data0.uvlijao.mongodb.net/course"
let options={};
app.use(express.json());
mongoose.connect(url, options).then(
    () => {
        console.log("ket noi thanh cong");
        /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ },
    err => { /** handle initial connection error */ });

// var ulRoute = require("./routes/ulRouter");
// app.use("/user", ulRoute);
// var svRoute = require("./routes/svRoute");
// app.use(svRoute);
// var LoginController = require("./routes/loginRoute");
// app.use("/dangnhap", LoginController);


var fs = require("fs");



var Schema = db.Schema;

// Settings
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
// app.engine("hbs", expressHbs.engine({ extname:"hbs", defaultLayout: "main"}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,

}))


// routes
app.use(indexRoutes);
app.use(cController);
app.use(uController);
app.use(authRotes);
app.use(function(req,res,next){
    if (req.user) {
        res.locals.user = req.user;
    }
    next();
    });

app.listen(port, function(){
    console.log(`Server listening ${port}`)
})