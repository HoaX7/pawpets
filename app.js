const express = require("express"),
  bodyParser = require("body-parser"),
  app = express();
  
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

const db = require("./config/keys").MongoURI;

//passport auth
require("./config/passport")(passport);

//connect to mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected"))
  .catch(err => console.log(err));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//routes
app.use("/", require("./routes/index.js"));
app.use("/", require("./routes/users.js"));
app.use("/", require("./routes/rest.js"));
app.use("/", require("./routes/posts.js"));
app.get('*',(req,res)=>{
  res.render('404');
});

app.listen(process.env.PORT, () => {
  console.log("server listening on port:", process.env.PORT);
});
