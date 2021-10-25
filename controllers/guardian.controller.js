const { logger } = require("../config/winston/winston.config");
const { allKeysHaveValue, isValidId, hiddenSensitiveData } = require("../utilities/index");
const Guardians = require("../models/guardian.model");

exports.create = async (request, response) => {
    logger.debug(`Guardian Controller create(${JSON.stringify(request.body)},  ${typeof response})`);
    const data = {
        id_patient: request.body.id_patient,
        name: request.body.name,
        phone: request.body.phone,
    };

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`);

    if (!allKeysHaveValue(data)) {
        logger.warn("Incomplete data");
        return response.status(400).send({ message: "Incomplete data." });
    }

    try {
      const { id_patient } = await Guardians.create(request.body)
      return response.status(200).json({ id_patient });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: "DB internal error." });
    }
};

exports.findAll = async (request, response) => {
    logger.debug(`Guardian Controller findAll(${JSON.stringify(request.body)},  ${typeof response})`);

    try {
      const guardians = await Guardians.findAll() 
      return response.status(200).json({ guardians });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ error: true, message: "DB internal error." });
    }
};

exports.find = async (request, response) => {
    logger.debug(`Guardian Controller find(${JSON.stringify(request.body)},  ${typeof response})`);
    const id = request.params.id;

    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });

    try {
      const guardian = await Guardians.findOne({ where: { id_patient: id }}) 
      return response.status(200).json(guardian);
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: "DB internal error." + error });
    }
};

exports.update = async (request, response) => {
    logger.debug(`Guardian Controller update(${JSON.stringify(request.body)},  ${typeof response})`);
    const id = request.params.id;

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`);

    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });
    const bodyGuardian = getDataGuardian(request.body);

    if (!bodyGuardian.isCorrect) {
        logger.warn("Incomplete data " + JSON.stringify(bodyGuardian));
        return response.status(400).send({ message: "Incorrect data." });
    }

    try {
      await Guardians.update(request.body, { where: { id_patient: id } })
      return response.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: "DB internal error." });
    }
};

exports.delete = async (request, response) => {
    logger.debug(`Guardian Controller delete(${JSON.stringify(request.body)},  ${typeof response})`);
    const id = request.params.id;
    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });

    try {
      await Guardians.destroy({ where: { id_patient: id } })
      return response.status(200).json({ message: "Deleted successfully." });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: "DB internal error." });
    }
};

const getDataGuardian = (body) => {
    logger.debug(`Guardian Controller getData(${JSON.stringify(body)})`);
    const data = {
        name: body.name,
        phone: body.phone,
    };

    const isCorrect = allKeysHaveValue(data);
    return { isCorrect, data: data };
};
