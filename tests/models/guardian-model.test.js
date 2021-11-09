const GuardianMock = require("../../__mocks__/models/guardian.model");

describe("Test sequelize mocking model Guardian", () => {

  test('Should get all values in the mock db', async () => {
    const guardians = await GuardianMock.findAll();
    const allGuardians = [];
    allGuardians.push(guardians[0].dataValues["0"]);
    allGuardians.push(guardians[0].dataValues["1"]);
    expect(allGuardians).toEqual([
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
    ]);
  });
  
  it("Should delete the element in the mock db", async () => {
    const guardian = await GuardianMock.destroy({
      where: {
        id: 1,
      },
    });
    expect(guardian).toBe(1);
  });
  
  it("Should return the element by id from the mock db", async () => {
    const guardian = await GuardianMock.findOne({
      where: {
        id: 1,
      },
    });
    expect(guardian.dataValues["0"]).toEqual({
      id: 1,
      name: "Daniel Antonio",
      phone: "9992351780"
    });
  });
  
  it("Should return [1]", async () => {
    const guardian = await GuardianMock.update([
      {
        id: 1,
        name: "Daniel Antonio",
        phone: "9992351781"
      },
    ]);
    expect(guardian).toEqual([1]);
  });
  
  it("Should return the new user", async () => {
    const guardian = await GuardianMock.create([
      {
        id: 3,
        name: "Carlos Cruz",
        phone: "9992361781"
      },
    ]);
    expect(guardian.dataValues["0"]).toEqual({
      id: 3,
      name: "Carlos Cruz",
      phone: "9992361781"
    });
  });
  
});