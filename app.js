var express     = require("express"),
app             = express(),
authRoutes      = require("./routes/authRoutes"),
mongoose        = require("mongoose"),
UserSchema      = require("./models/user"),
passportConfig  = require("./services/passport"),
cookieSession   = require("cookie-session"),
passport        = require("passport");


mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});
