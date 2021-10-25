const Patient = require("../models/patient.model");
const Guardian = require("../models/guardian.model");
const { logger } = require("../config/winston/winston.config");
const { allKeysHaveValue, isValidId, isSexValid, hiddenSensitiveData } = require("../utilities/index");
const Patients = require("../models/patient.model");
const Guardians = require("../models/guardian.model");

exports.create = async (request, response) => {
    logger.debug(`Patient Controller create(${JSON.stringify(request.body)},  ${typeof response})`);

    bodyPatient = getDataPatient(request.body);
    // bodyGuardian = getDataGuardian(request.body);

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`);

    if (!bodyPatient.isCorrect) {
        logger.warn("Incomplete data");
        return response.status(400).send({ message: "Incorrect data." });
    }

    try {
      const { id } = await Patients.create(bodyPatient.data)
      return response.status(200).json({ patient_id: id });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: " DB internal error. " + error });
    }

};

exports.findAll = async (request, response) => {
    logger.debug(`Patient Controller findAll(${JSON.stringify(request.body)},  ${typeof response})`);

    try {
      const patients = await Patients.findAll()
      return response.status(200).json({ patients });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: " DB internal error. " + error });
    }
};

exports.find = async (request, response) => {
    logger.debug(`Patient Controller find(${JSON.stringify(request.body)},  ${typeof response})`);

    const id = request.params.id;
    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });

    try {
      const patient = await Patients.findOne({ where: { id }})
      return response.status(200).json({ patient });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: " DB internal error. " + error });
    }
};

exports.update = async (request, response) => {
    logger.debug(`Patient Controller update(${JSON.stringify(request.body)},  ${typeof response})`);

    const id = request.params.id;

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`);

    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });
    bodyPatient = getDataPatient(request.body);

    if (!bodyPatient.isCorrect) {
        logger.warn("Incomplete data");
        return response.status(400).send({ message: "Incorrect data." });
    }

    try {
      await Patients.update(request.body, { where: { id }})
      return response.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: " DB internal error. " + error });
    }
};

exports.delete = async (request, response) => {
    logger.debug(`Patient Controller delete(${JSON.stringify(request.body)},  ${typeof response})`);

    const id = request.params.id;

    if (!isValidId(id)) return response.status(400).send({ message: "Invalid id." });

    try {
      await Guardians.destroy({ where: { id_patient: id }})
      await Patients.destroy({ where: { id }})
      return response.status(200).json({ message: "Deleted successfully." });
    } catch (error) {
      logger.error(error);
      return response.status(500).send({ message: " DB internal error. " + error });
    }
};

const getDataPatient = (body) => {
    logger.debug(`Patient Controller getDataPatient(${JSON.stringify(body)})`);

    const data = {
        names: body.names,
        last_name: body.last_name,
        second_last_name: body.second_last_name,
        sex: body.sex,
        birthday: body.birthday,
        inscription_date: body.inscription_date,
        id_hospital: body.id_hospital,
    };

    const isCorrect = allKeysHaveValue(data) && isSexValid(data.sex);

    return { isCorrect, data: data };
};

const getDataGuardian = (body) => {
    logger.debug(`Patient Controller getDataGuardian(${JSON.stringify(body)})`);

    const data = {
        name: body.guardian_name,
        phone: body.guardian_phone,
    };

    return { isCorrect: allKeysHaveValue(data), data: data };
};
