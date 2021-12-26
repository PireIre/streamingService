//Dependencies
const config = require("config");
const express = require("express");
const genres = require("./routes/genres")
const homepage = require("./routes/homepage")
const logger = require("./logger")
const authenticate = require("./authentication")
const morgan = require("morgan")

const app = express();

//Configuration
console.log(config.get("name"))
console.log(config.get("mail"))


if(app.get("env") === "development"){
    console.log("Morgan is enabled")
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

// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
