const Guardian = require("../models/guardian.model");
const { logger } = require("../config/winston/winston.config");
const { allKeysHaveValue, isValidId, hiddenSensitiveData } = require("../utilities/index");

exports.create = (request, response) => {
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

    const createGuardianOrSendError = (error, guardian_id) => {
        if (error) {
            logger.error(error);
            return response.status(500).send({ message: "DB internal error." });
        }
        return response.status(200).json({ id: guardian_id });
    };

    Guardian.create(data, createGuardianOrSendError);
};

exports.findAll = (request, response) => {
    logger.debug(`Guardian Controller findAll(${JSON.stringify(request.body)},  ${typeof response})`);
    const SendGuardiansOrError = (error, guardians) => {
        if (error) {
            logger.error(error);
            return response.status(500).send({ error: true, message: "DB internal error." });
        }
        return response.status(200).json({ guardians: guardians });
    };
    Guardian.findAll(SendGuardiansOrError);
};

exports.find = (request, response) => {
    logger.debug(`Guardian Controller find(${JSON.stringify(request.body)},  ${typeof response})`);
    const id = request.params.id;

    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });

    const sendGuardianOrError = (error, guardian) => {
        if (error) {
            logger.error(error);
            return response.status(500).send({ message: "DB internal error." + error });
        }
        if (guardian.length > 0) return response.status(200).json(guardian[0]);
        return response.status(200).json({});
    };

    Guardian.find(id, sendGuardianOrError);
};

exports.update = (request, response) => {
    logger.debug(`Guardian Controller update(${JSON.stringify(request.body)},  ${typeof response})`);
    const id = request.params.id;

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`);

    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });
    const bodyGuardian = getDataGuardian(request.body);

    if (!bodyGuardian.isCorrect) {
        logger.warn("Incomplete data " + JSON.stringify(bodyGuardian));
        return response.status(400).send({ message: "Incorrect data." });
    }

    const sendUpdateMessageOrError = (error) => {
        if (error) {
            logger.error(error);
            return response.status(500).send({ message: "DB internal error." });
        }
        return response.status(200).json({ message: "Updated Successfully" });
    };

    Guardian.update(id, bodyGuardian.data, sendUpdateMessageOrError);
};

exports.delete = (request, response) => {
    logger.debug(`Guardian Controller delete(${JSON.stringify(request.body)},  ${typeof response})`);
    const id = request.params.id;
    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });

    const deletedGuardianOrSendError = (error, result) => {
        if (error) {
            logger.error(error);
            return response.status(500).send({ message: "DB internal error." });
        }
        return response.status(200).json({ message: "Deleted successfully." });
    };

    Guardian.delete(id, deletedGuardianOrSendError);
};

const getDataGuardian = (body) => {
    logger.debug(`Guardian Controller getData(${JSON.stringify(body)})`);
    const data = {
        name: body.guardian_name,
        phone: body.guardian_phone,
    };

    const isCorrect = allKeysHaveValue(data);
    return { isCorrect, data: data };
};
