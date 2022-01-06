//Dependencies
const config = require("config");
const express = require("express");
const genres = require("./routes/genres")
const users = require("./routes/users")
const movies = require("./routes/movies")
const rentals = require("./routes/rentals")
const auth = require("./routes/auth")
const customers = require("./routes/customers")
const homepage = require("./routes/homepage")
const logger = require("./logger")
const morgan = require("morgan")
const debug = require("debug")("app:startup")
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

mongoose.connect("mongodb://localhost/streamingService")
    .then(() => console.log("connected for mongoDB"))
    .catch(err => console.log("could not connect to mongoDB" + err))

const app = express();

//Configuration
debug(config.get("name"))
debug(config.get("mail"))

if(!config.get("jwtPrivateKey")) {
    debug("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}

if(app.get("env") === "development"){
    debug("Morgan is enabled")
    app.use(morgan('tiny'))
}

app.use(express.json());
app.use(express.static('public'));


//custom middleware for loggin and authenticating
app.use(logger);


//Load homepage router
app.use("/", homepage)

//Load genres router
app.use("/api/genres", genres)

//Load customers router
app.use("/api/customers", customers)

//Load users router
app.use("/api/users", users)

//Load movies router
app.use("/api/movies", movies)

//Load movies router
app.use("/api/rentals", rentals)

//Load movies router
app.use("/api/auth", auth)


// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    debug(`listening on port ${PORT}`)
})
