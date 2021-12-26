logger = (req, res, next) => {
    console.log("logging...")
    next();
}

module.exports = logger;