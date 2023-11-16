const errorHandler = (err, req, res, next) => {

    switch (err.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            res.status(400).json({ message: err.errors[0].message })
            break;
        case "NoEmail/Password":
            res.status(400).json({ message: "Email/Password is required" });
            break;
        case "InvalidEmail/Password":
            res.status(401).json({ message: "Invalid email/password" });
            break;
        case "NotFound":
            res.status(404).json({ message: "Sorry, Product not found" });
            break;
        case "JsonWebTokenError":
        case "InvalidToken":
            res.status(401).json({ message: "Invalid Token" })
            break;
        case "Forbidden":
            res.status(403).json({ message: "Forbidden" })
            break;
        case "UniqueEmail":
            res.status(401).json({ message: "Email already registered" })
            break;
        case "Already Registered":
            res.status(401).json({ message: "Item already registered" })
            break;
        default:
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = errorHandler