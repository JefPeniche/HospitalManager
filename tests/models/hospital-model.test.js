const HospitalMock = require("../../__mocks__/models/hospital.mock");

describe("Test sequelize mocking model Hospital", () => {

  test('Should get all values in the mock db', async () => {
    const hospitals = await HospitalMock.findAll();
    const allHospitals = [];
    allHospitals.push(hospitals[0].dataValues["0"]);
    allHospitals.push(hospitals[0].dataValues["1"]);
    expect(allHospitals).toEqual([
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
    ]);
  });
  
  it("Should delete the element in the mock db", async () => {
    const hospital = await HospitalMock.destroy({
      where: {
        id: 1,
      },
    });
    expect(hospital).toBe(1);
  });
  
  it("Should return the element by id from the mock db", async () => {
    const hospital = await HospitalMock.findOne({
      where: {
        id: 1,
      },
    });
    expect(hospital.dataValues["0"]).toEqual({
      id: 1,
      name: "IMSS",
      city: "Valladolid"
    });
  });
  
  it("Should return [1]", async () => {
    const hospital = await HospitalMock.update([
      {
        id: 1,
        name: "Santa Rosa",
        city: "Veracruz",
      },
    ]);
    expect(hospital).toEqual([1]);
  });
  
  it("Should return the new user", async () => {
    const hospital = await HospitalMock.create([
      {
        id: 3,
        name: "Clinica Pensiones",
        city: "Mérida"
      },
    ]);
    expect(hospital.dataValues["0"]).toEqual({
      id: 3,
      name: "Clinica Pensiones",
      city: "Mérida"
    });
  });
  
});