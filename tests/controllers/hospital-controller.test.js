const supertest = require("supertest");
const app = require("../../__mocks__/app.mock");

describe("Test hospital controller", () => {
  it("Should response all the mock elements", async () => {
    const response = await supertest(app).get("/api/hospitals");
    expect(response.body).toEqual({
      data: [
        {
          id: 1,
          name: "IMSS",
          city: "Valladolid",
        },
        {
          id: 2,
          name: "IMSS",
          city: "Mérida",
        },
      ],
    });
  });

  it("Should return the new hospital", async () => {
    const response = await supertest(app).post("/api/hospitals");
    expect(response.body).toEqual({
      data: {
        id: 1,
        name: "IMSS",
        city: "Valladolid",
      },
    });
  });

  it("Should response the hospital by id", async () => {
    const response = await supertest(app).get("/api/hospitals/2");
    expect(response.body).toEqual({
      data: {
        id: "2",
        name: "hospital matched",
        city: "hospital city",
      },
    });
  });

  it("Should response the long of the delete hospital", async () => {
    const response = await supertest(app).delete("/api/hospitals/1");
    expect(response.body).toEqual({ data: "1" });
  });

  it("Should response the new hospital", async () => {
    const response = await supertest(app).put("/api/hospitals/2");
    expect(response.body).toEqual({
      data: {
        id: 1,
        name: "new name",
        city: "new hospital city",
      },
    });
  });
});
