var express = require("express")
var path = require("path")
var mongoose = require("mongoose")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var multer  = require('multer')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var morgan = require('morgan')

var port = process.env.PORT || 1938
var app = express()
var settings_db = 'mongodb://localhost/blg'
mongoose.connect(settings_db)

app.set("views", "./app/view/pages")
app.set("view engine", "jade")
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(multer({ dest: './public/uploads/'}))
app.use(session({
    secret: "blog",
    store: new MongoStore({
        url: settings_db,
        collection: "sessions",
    }),
    resave: false,
    saveUninitialized: true,
}));

if ("development" === app.get("env")) {
    app.locals.pretty = true
    app.use(morgan(':url :method :status :response-time'))
    mongoose.set("debug", true)
}

require("./config/routes")(app)

app.listen(port)
console.log("my blog started on port: " + port)
