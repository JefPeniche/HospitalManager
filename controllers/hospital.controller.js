const { allKeysHaveValue, isValidId, hiddenSensitiveData } = require("../utilities/index");
const { logger } = require("../config/winston/winston.config");
const Hospitals = require("../models/hospital.model");

exports.create = async (request, response) => {
    logger.debug(`Hospital Controller create(${JSON.stringify(request.body)},  ${typeof response})`);
    const data = {
        name: request.body.name,
        city: request.body.city,
    };

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`);

    if (!allKeysHaveValue(data)) {
        logger.warn("Incomplete data");
        return response.status(400).send({ message: "Incomplete data." });
    }

    try {
      const { id }= await Hospitals.create(data);
      return response.status(200).json({ id });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: "DB internal error." });
    }

}

exports.findAll = async (request, response) => {
    logger.debug(`Hospital Controller findALl(${JSON.stringify(request.body)},  ${typeof response})`);

    try {
      const hospitals = await Hospitals.findAll()  
      return response.status(200).json({ hospitals });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ error: true, message: "DB internal error." });
    }
};

exports.find = async (request, response) => {
    logger.debug(`Hospital Controller find(${JSON.stringify(request.body)},  ${typeof response})`);

    const id = request.params.id;
    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });

    try {
      const hospital = await Hospitals.findOne({ where: { id } }) 
      return response.status(200).json(hospital);
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: "DB internal error." + error });
    }
};

exports.update = async (request, response) => {
    logger.debug(`Hospital Controller update(${JSON.stringify(request.body)},  ${typeof response})`);

    const id = request.params.id;

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`);

    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });
    bodyhospital = getDatahospital(request.body);

    if (!bodyhospital.isCorrect) {
        logger.warn("Incomplete data");
        return response.status(400).send({ message: "Incorrect data." });
    }

    try {
      await Hospitals.update(request.body, { where: { id: id } })
      return response.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: "DB internal error." });
    }
};

exports.delete = async (request, response) => {
    logger.debug(`Hospital Controller delete(${JSON.stringify(request.body)},  ${typeof response})`);

    const id = request.params.id;

    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });

    try {
      await Hospitals.destroy({ where: { id } }) 
      return response.status(200).json({ message: "Deleted successfully." });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: "DB internal error." });
    }
};

const getDatahospital = (body) => {
    logger.debug(`Hospital Controller getData(${JSON.stringify(body)})`);

    const data = {
        name: body.name,
        city: body.city,
    };

    return { isCorrect: allKeysHaveValue(data), data: data };
};
