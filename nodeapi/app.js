const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();


//db
mongoose
    .connect(
        process.env.MONGO_URI, { useNewUrlParser: true }
    )
    .then(() => console.log("DB connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});


//bring in routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized !" });
    } else {
        next(err);
    }
});


//listen to application 
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});