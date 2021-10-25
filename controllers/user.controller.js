const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const moment = require("moment");
const { logger } = require("../config/winston/winston.config");
const { allKeysHaveValue, hiddenSensitiveData } = require("../utilities/index");

exports.register = async (request, response) => {
    logger.debug(`User Controller register(${JSON.stringify(request.body)},  ${typeof response})`);

    const data = {
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10),
        name: request.body.name,
    };

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`);

    if (!allKeysHaveValue(data)) {
        logger.warn("Incomplete data");
        return response.status(400).send({ message: "Incomplete data." });
    }
    try {
        const result = await Users.create(data);
        return response.json(result);
    } catch (error) {
        logger.error(error);
        return response.status(500).send({ message: error });
    }
}

exports.login = async (req, res) => {
    logger.debug(`User Controller login(${JSON.stringify(req.body)},  ${typeof res})`);
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ where: { email } });
      logger.debug(`body: ${hiddenSensitiveData(req.body)}`);
      if (!user) {
        logger.warn("User not found");
        return res.json({ error: "Error, user not found" });
      }
      const matchPassword = bcrypt.compareSync(password, user.password);
      return matchPassword ? res.json({ succesfull: createToken(user), done: "Welcome again!" }) : res.json({ error: "Error, wrong password" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ message: error });
    }
};

exports.getAll = async (req, res) => {
    logger.debug(`User Controller getAll(${JSON.stringify(req.body)},  ${typeof res})`);

    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        logger.error(error);
        return res.status(500).send({ message: error });
    }
};

const createToken = (user) => {
    logger.debug(`User Controller createToken(${JSON.stringify(user)}`);
    let payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, "day").unix(),
    };
    return jwt.encode(payload, "Token-Auth");
};
