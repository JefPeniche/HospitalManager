const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const moment = require("moment");

exports.register = async (request, response) => {
    const data = {
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10),
        name: request.body.name,
    };
    if (Object.keys(data).some((key) => typeof data[key] === "undefined") || Object.keys(data).some((key) => data[key].length === 0)) response.status(400).send({ message: "Incomplete data." });
    else {
        const result = await Users.insert(data);
        response.json(result);
    }
};

exports.login = async (req, res) => {
    const user = await Users.getByEmail(req.body.email);
    if (user === undefined) {
        res.json({
            error: "Error, user not found",
        });
    } else {
        const matchPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!matchPassword) {
            res.json({
                error: "Error, wrong password",
            });
        } else {
            res.json({
                succesfull: createToken(user),
                done: "Welcome again!",
            });
        }
    }
};

exports.getAll = async (req, res) => {
    const users = await Users.getAll();
    res.json(users);
};

const createToken = (user) => {
    let payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, "day").unix(),
    };
    return jwt.encode(payload, "Token-Auth");
};
