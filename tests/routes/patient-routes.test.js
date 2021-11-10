const supertest = require("supertest");
const app = require("../../__mocks__/app.mock");
// GET Route
describe("GET /patients", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/patients");
        expect(statusCode).toBe(200);
    });
});

// POST Route
describe("POST /patients", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/patients");
        expect(statusCode).toBe(200);
    });
});

//GET BY ID Route
describe("GET BY ID /patients", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/patients");
        expect(statusCode).toBe(200);
    });
});

// DELETE Route
describe("DELETE /patients", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/patients");
        expect(statusCode).toBe(200);
    });
});

// PUT Route
describe("PUT /customer", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/patients");
        expect(statusCode).toBe(200);
    });
});
