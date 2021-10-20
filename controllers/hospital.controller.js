const Hospital = require("../models/hospital.model");
const { allKeysHaveValue, isValidId, hiddenSensitiveData } = require("../utilities/index");
const { logger } = require("../config/winston/winston.config");

exports.create = (request, response) => {
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

    const sendHospitalIdOrError = (error, hospital_id) => {
        if (error) {
            logger.error(error);
            return response.status(500).send({ message: "DB internal error." });
        }
        return response.status(200).json({ id: hospital_id });
    };

    Hospital.create(data, sendHospitalIdOrError);
};

exports.findAll = (request, response) => {
    logger.debug(`Hospital Controller findALl(${JSON.stringify(request.body)},  ${typeof response})`);

    const sendHospitalsOrError = (error, hospitals) => {
        if (error) {
            logger.error(error);
            return response.status(500).send({ error: true, message: "DB internal error." });
        }
        return response.status(200).json({ hospitals: hospitals });
    };
    Hospital.findAll(sendHospitalsOrError);
};

exports.find = (request, response) => {
    logger.debug(`Hospital Controller find(${JSON.stringify(request.body)},  ${typeof response})`);

    const id = request.params.id;
    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });

    const sendHospitalOrError = (error, hospital) => {
        if (error) {
            logger.error(error);
            return response.status(500).send({ message: "DB internal error." + error });
        }
        if (hospital.length > 0) return response.status(200).json(hospital[0]);
        return response.status(200).json({});
    };
    Hospital.find(id, sendHospitalOrError);
};

exports.update = (request, response) => {
    logger.debug(`Hospital Controller update(${JSON.stringify(request.body)},  ${typeof response})`);

    const id = request.params.id;

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`);

    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });
    bodyhospital = getDatahospital(request.body);

    if (!bodyhospital.isCorrect) {
        logger.warn("Incomplete data");
        return response.status(400).send({ message: "Incorrect data." });
    }

    const sendSuccesMessageOrError = (error) => {
        if (error) {
            logger.error(error);
            return response.status(500).send({ message: "DB internal error." });
        }
        return response.status(200).json({ message: "Updated Successfully" });
    };
    Hospital.update(id, bodyhospital.data, sendSuccesMessageOrError);
};

exports.delete = (request, response) => {
    logger.debug(`Hospital Controller delete(${JSON.stringify(request.body)},  ${typeof response})`);

    const id = request.params.id;

    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });

    const sendSuccesMessageOrError = (error) => {
        if (error) {
            logger.error(error);
            return response.status(500).send({ message: "DB internal error." });
        }
        return response.status(200).json({ message: "Deleted successfully." });
    };
    Hospital.delete(id, sendSuccesMessageOrError);
};

const getDatahospital = (body) => {
    logger.debug(`Hospital Controller getData(${JSON.stringify(body)})`);

    const data = {
        name: body.name,
        city: body.city,
    };

    return { isCorrect: allKeysHaveValue(data), data: data };
};
