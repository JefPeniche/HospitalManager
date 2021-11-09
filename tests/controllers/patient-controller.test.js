const supertest = require("supertest");
const app = require("../../__mocks__/app.mock");

describe("Test patient controller", () => {
  it("Should response all the mock elements", async () => {
    const response = await supertest(app).get("/api/patients");
    expect(response.body).toEqual({
      data: [
        {
          id: 1,
          names: "Juan",
          last_name: "Perez",
          second_last_name: "Concha",
          sex: "M",
          birthday: "2005-05-30",
          inscription_date: "2021-06-30",
          id_hospital: 1,
        },
        {
          id: 2,
          names: "Rosa",
          last_name: "Vazquez",
          second_last_name: "Zapata",
          sex: "F",
          birthday: "2005-06-31",
          inscription_date: "2021-06-31",
          id_hospital: 1,
        },
      ],
    });
  });

  it("Should return the new patient", async () => {
    const response = await supertest(app).post("/api/patients");
    expect(response.body).toEqual({
      data: {
        id: 1,
        names: "Juan",
        last_name: "Perez",
        second_last_name: "Concha",
        sex: "M",
        birthday: "2005-05-30",
        inscription_date: "2021-06-30",
        id_hospital: 1,
      },
    });
  });

  it("Should response the patient by id", async () => {
    const response = await supertest(app).get("/api/patients/2");
    expect(response.body).toEqual({
      data: {
        id: "2",
        names: "Juan",
        last_name: "Perez",
        second_last_name: "Concha",
        sex: "M",
        birthday: "2005-05-30",
        inscription_date: "2021-06-30",
        id_hospital: 1,
      },
    });
  });

  it("Should response the long of the delete patient", async () => {
    const response = await supertest(app).delete("/api/patients/1");
    expect(response.body).toEqual({ data: "1" });
  });

  it("Should response the new patient", async () => {
    const response = await supertest(app).put("/api/patients/2");
    expect(response.body).toEqual({
      data: {
        id: 1,
        names: "Juan",
        last_name: "Perez",
        second_last_name: "Manzanilla",
        sex: "M",
        birthday: "2005-05-30",
        inscription_date: "2021-06-30",
        id_hospital: 1,
      },
    });
  });
});
