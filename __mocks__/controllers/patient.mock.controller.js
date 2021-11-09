exports.create = async (req, res) => {
    const newPatient = {
        id: 1,
        names: "Juan",
        last_name: "Perez",
        second_last_name: "Concha",
        sex: "M",
        birthday: "2005-05-30",
        inscription_date: "2021-06-30",
        id_hospital: 1
    };
    return res.status(200).json({ data: newPatient });
};

exports.getAll = async (req, res) => {
    const allPatients = [
      {
        id: 1,
        names: "Juan",
        last_name: "Perez",
        second_last_name: "Concha",
        sex: "M",
        birthday: "2005-05-30",
        inscription_date: "2021-06-30",
        id_hospital: 1
      },
      {
        id: 2,
        names: "Rosa",
        last_name: "Vazquez",
        second_last_name: "Zapata",
        sex: "F",
        birthday: "2005-06-31",
        inscription_date: "2021-06-31",
        id_hospital: 1
      }
    ];
    return res.status(200).json({
        data: allPatients,
    });
};

exports.getById = async (req, res) => {
    const id = req.params.id;
    const patient = {
      id: id,
      names: "Juan",
      last_name: "Perez",
      second_last_name: "Concha",
      sex: "M",
      birthday: "2005-05-30",
      inscription_date: "2021-06-30",
      id_hospital: 1
    };
    return res.status(200).json({ data: patient });
};

exports.deletePatient = async (req, res) => {
    const id = req.params.id;
    return res.status(200).json({ data: id });
};

exports.update = async (req, res) => {
    const patient = {
      id: 1,
      names: "Juan",
      last_name: "Perez",
      second_last_name: "Manzanilla",
      sex: "M",
      birthday: "2005-05-30",
      inscription_date: "2021-06-30",
      id_hospital: 1
    };
    return res.status(200).json({ data: patient });
}