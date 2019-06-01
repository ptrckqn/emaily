var express     = require("express"),
app             = express(),
bodyParser      = require("body-parser")
authRoutes      = require("./routes/authRoutes"),
billingRoutes    = require("./routes/billingRoutes")
mongoose        = require("mongoose"),
UserSchema      = require("./models/User"),
passportConfig  = require("./services/passport"),
cookieSession   = require("cookie-session"),
passport        = require("passport");


mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

app.use(bodyParser.json())
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(billingRoutes);

if(process.env.NODE_ENV === 'production'){
  //Serving production assets such as main.js and main.css
  app.use(express.static('client/build'))

  //Serving up index.html if a route is not recognized
  const path = require('path')
  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});
