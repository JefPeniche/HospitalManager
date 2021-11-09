const PatientMock = require("../../__mocks__/models/patient.model");

describe("Test sequelize mocking model Patient", () => {

  test('Should get all values in the mock db', async () => {
    const patients = await PatientMock.findAll();
    const allPatients = [];
    allPatients.push(patients[0].dataValues["0"]);
    allPatients.push(patients[0].dataValues["1"]);
    expect(allPatients).toEqual([
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
    ]);
  });
  
  it("Should delete the element in the mock db", async () => {
    const patient = await PatientMock.destroy({
      where: {
        id: 1,
      },
    });
    expect(patient).toBe(1);
  });
  
  it("Should return the element by id from the mock db", async () => {
    const patient = await PatientMock.findOne({
      where: {
        id: 1,
      },
    });
    expect(patient.dataValues["0"]).toEqual({
        id: 1,
        names: "Juan",
        last_name: "Perez",
        second_last_name: "Concha",
        sex: "M",
        birthday: "2005-05-30",
        inscription_date: "2021-06-30",
        id_hospital: 1
    });
  });
  
  it("Should return [1]", async () => {
    const patient = await PatientMock.update([
      {
        id: 1,
        names: "Juan",
        last_name: "Ku",
        second_last_name: "Concha",
        sex: "M",
        birthday: "2005-05-30",
        inscription_date: "2021-06-30",
        id_hospital: 1
      },
    ]);
    expect(patient).toEqual([1]);
  });
  
  it("Should return the new user", async () => {
    const patient = await PatientMock.create([
      {
        id: 3,
        names: "Carlos",
        last_name: "Manrique",
        second_last_name: "Canche",
        sex: "M",
        birthday: "2005-07-30",
        inscription_date: "2021-068-30",
        id_hospital: 2
      },
    ]);
    expect(patient.dataValues["0"]).toEqual({
        id: 3,
        names: "Carlos",
        last_name: "Manrique",
        second_last_name: "Canche",
        sex: "M",
        birthday: "2005-07-30",
        inscription_date: "2021-068-30",
        id_hospital: 2
    });
  });
});