exports.create = async (req, res) => {
    const newGuardian = {
        id: 1,
        name: "Daniel Antonio",
        phone: "9992351780"
    };
    return res.status(200).json({ data: newGuardian });
};

exports.getAll = async (req, res) => {
    const allGuardians = [
      {
        id: 1,
        name: "Daniel Antonio",
        phone: "9992351780"
      },
      {
        id: 2,
        name: "Alvar Peniche",
        phone: "9992351680"
      }
    ];
    return res.status(200).json({
        data: allGuardians,
    });
};

exports.getById = async (req, res) => {
    const id = req.params.id;
    const guardian = {
        id: id,
        name: "guardian matched",
        phone: "guardian phone",
    };
    return res.status(200).json({ data: guardian });
};

exports.deleteGuardian = async (req, res) => {
    const id = req.params.id;
    return res.status(200).json({ data: id });
};

exports.update = async (req, res) => {
    const guardian = {
        id: 1,
        name: "new name",
        phone: "9999999999",
    };
    return res.status(200).json({ data: guardian });
}