const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const moment = require("moment");
const { allKeysHaveValue }  = require('../utilities/index')

exports.register = async (request, response) => {
    const data = {
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10),
        name: request.body.name,
    };

    if (!allKeysHaveValue(data)) return response.status(400).send({ message: "Incomplete data." })
    const result = await Users.insert(data);
    return response.json(result);
};

exports.login = async (req, res) => {
    const user = await Users.getByEmail(req.body.email);

    if(!user) return res.json({ error: "Error, user not found" })
    const matchPassword = bcrypt.compareSync(req.body.password, user.password);
    return matchPassword ? res.json({ succesfull: createToken(user), done: "Welcome again!" }) : res.json({ error: "Error, wrong password" })
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
