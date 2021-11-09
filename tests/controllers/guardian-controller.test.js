const supertest = require("supertest");
const app = require("../../__mocks__/app.mock");

describe("Test guardian controller", () => {
  it("Should response all the mock elements", async () => {
    const response = await supertest(app).get("/api/guardians");
    expect(response.body).toEqual({
      data: [
        {
          id: 1,
          name: "Daniel Antonio",
          phone: "9992351780",
        },
        {
          id: 2,
          name: "Alvar Peniche",
          phone: "9992351680",
        },
      ],
    });
  });

  it("Should return the new guardian", async () => {
    const response = await supertest(app).post("/api/guardians");
    expect(response.body).toEqual({
      data: {
        id: 1,
        name: "Daniel Antonio",
        phone: "9992351780",
      },
    });
  });

  it("Should response the guardian by id", async () => {
    const response = await supertest(app).get("/api/guardians/2");
    expect(response.body).toEqual({
      data: {
        id: "2",
        name: "guardian matched",
        phone: "guardian phone",
      },
    });
  });

  it("Should response the long of the delete guardian", async () => {
    const response = await supertest(app).delete("/api/guardians/1");
    expect(response.body).toEqual({ data: "1" });
  });

  it("Should response the new guardian", async () => {
    const response = await supertest(app).put("/api/guardians/2");
    expect(response.body).toEqual({
      data: {
        id: 1,
        name: "new name",
        phone: "9999999999",
      },
    });
  });
});
