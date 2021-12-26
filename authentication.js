authenticate = (req, res, next) => {
    console.log("authenticating...")
    next();
}

module.exports = authenticate;