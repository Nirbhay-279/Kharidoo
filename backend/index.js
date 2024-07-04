const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const cookieParser = require("cookie-parser");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");
const mongoose = require("mongoose");
const Product = require("./routes/Product.js"); // Check the path to your Product module
const User = require("./routes/User.js");
const Cart = require("./routes/Cart.js");
const Orders = require("./routes/Orders.js");
const Review = require("./routes/Review.js");
const Auth = require("./routes/Auth");
const UserModel = require("./model/User");
const path = require("path");
const app = express();
// JWT options

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = "Secret";

//middlewares

// app.use(express.static(path.resolve(__dirname, "build")));
app.use(cookieParser());
app.use(
  session({
    secret: "Secret",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
app.use(passport.authenticate("session"));
// app.use(
//   cors({
//     exposedHeaders: ["X-Total-Count"],
//   })
// );

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is allowed
    if (allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true,
};
// const corsOptions = {
//   origin: '*',
//   methods: "GET,POST,PUT,DELETE,PATCH",
//   credentials: true,
// };

app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");

//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, HEAD, OPTIONS, POST, PUT, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   next();
// });
// app.use(function(req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "*");
//   const allowedOrigins = ['http://localhost:5173', 'http://gamebrag.onrender.com', 'https://gamebrag.onrender.com'];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
//   next();
// });
const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vishalkamboj9211:vishal1234@cluster0.tqdqd4j.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("DB is connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

db();

// Make sure to use "app", not "app"
app.use(express.json());
app.use("/auth", Auth);
app.use("/products", isAuth(), Product);
app.use("/user", isAuth(), User);
app.use("/cart", isAuth(), Cart);
app.use("/orders", isAuth(), Orders);
app.use("/review", isAuth(), Review);

// Passport Strategies
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    // by default passport uses username
    console.log({ email, password });
    try {
      const user = await UserModel.findOne({ email: email });
      console.log(email, password, user);
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), "Secret");
          done(null, { id: user.id, role: user.role, token }); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await UserModel.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// Payments
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
