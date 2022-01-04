//Dependencies
const config = require("config");
const express = require("express");
const genres = require("./routes/genres")
const movies = require("./routes/movies")
const users = require("./routes/users")
const homepage = require("./routes/homepage")
const logger = require("./logger")
const authenticate = require("./authentication")
const morgan = require("morgan")
const debug = require("debug")("app:startup")
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/streamingService")
    .then(() => console.log("connected for mongoDB"))
    .catch(err => console.log("could not connect to mongoDB" + err))

const app = express();

//Configuration
debug(config.get("name"))
debug(config.get("mail"))


if(app.get("env") === "development"){
    debug("Morgan is enabled")
    app.use(morgan('tiny'))
}

app.use(express.json());
app.use(express.static('public'));


//custom middleware for loggin and authenticating
app.use(authenticate);
app.use(logger);


//Load homepage router
app.use("/", homepage)

//Load genres router
app.use("/api/genres", genres)

//Load users router
app.use("/api/users", users)

//Load movies router
app.use("/api/movies", movies)


// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    debug(`listening on port ${PORT}`)
})
