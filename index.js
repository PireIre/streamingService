//Dependencies
const express = require("express");
const genres = require("./routes/genres")
const homepage = require("./routes/homepage")

const app = express();

app.use(express.json());

//Load homepage router
app.use("/", homepage)

//Load genres router
app.use("/api/genres", genres)

// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
