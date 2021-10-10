const jwt = require("jwt-simple");
const moment = require("moment");

const checkToken = (req, res, next) => {
    if (!req.headers["user_token"])
        return res.json({
            error: "You need to include your Token",
        });

    const token = req.headers["user_token"];
    let payload = null;
    try {
        payload = jwt.decode(token, "Token-Auth");
    } catch (err) {
        return res.json({
            error: "Invalid Token",
        });
    }

    if (moment().unix() > payload.expiresAt) {
        return res.json({ error: "Expired token" });
    }

    req.userId = payload.userId;

    next();
};

module.exports = {
    checkToken: checkToken,
};
