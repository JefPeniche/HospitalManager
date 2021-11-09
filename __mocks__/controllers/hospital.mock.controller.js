exports.create = async (req, res) => {
    const newHospital = {
        id: 1,
        name: "IMSS",
        city: "Valladolid"
    };
    return res.status(200).json({ data: newHospital });
};

exports.getAll = async (req, res) => {
    const allHospitals = [
      {
        id: 1,
        name: "IMSS",
        city: "Valladolid"
      },
      {
        id: 2,
        name: "IMSS",
        city: "Mérida"
      }
    ];
    return res.status(200).json({
        data: allHospitals,
    });
};

exports.getById = async (req, res) => {
    const id = req.params.id;
    const hospital = {
        id: id,
        name: "hospital matched",
        city: "hospital city",
    };
    return res.status(200).json({ data: hospital });
};

exports.deleteHospital = async (req, res) => {
    const id = req.params.id;
    return res.status(200).json({ data: id });
};

exports.update = async (req, res) => {
    const hospital = {
        id: 1,
        name: "new name",
        city: "new hospital city",
    };
    return res.status(200).json({ data: hospital });
};