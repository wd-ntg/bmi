const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/Users.js");
const initAuth = require("./routes/Auth.js");
const initHealthIndex = require("./routes/HealthIndex.js");
const initOpenAI = require("./routes/OpenAI.js")
const initCalendar = require('./routes/Calendar.js')
const initChat = require("./routes/Chat.js")
// OpenAI
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "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",
  organization: "org-mtgRW3my2tOru3fol4Ts3diA",
});

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const URI =
  "mongodb+srv://admin:" +
  process.env.MONGO_PASSWORD +
  "@cluster0.1hegxq8.mongodb.net/?retryWrites=true&w=majority";

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error(err);
  });

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "123";

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

app.use("/auth", initAuth);
app.use("/healthindex", initHealthIndex);
app.use("/openai", initOpenAI)
app.use("/calendar", initCalendar)
app.use("/chat", initChat)

app.get("/", (req, res) => {
  res.send("Server i running");
});
