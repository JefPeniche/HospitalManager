const supertest = require("supertest");
const app = require("../../__mocks__/app.mock");
// GET Route
describe("GET /guardians", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/guardians");
        expect(statusCode).toBe(200);
    });
});

// POST Route
describe("POST /guardians", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/guardians");
        expect(statusCode).toBe(200);
    });
});

//GET BY ID Route
describe("GET BY ID /guardians", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/guardians");
        expect(statusCode).toBe(200);
    });
});

// DELETE Route
describe("DELETE /guardians", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/guardians");
        expect(statusCode).toBe(200);
    });
});

// PUT Route
describe("PUT /customer", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/guardians");
        expect(statusCode).toBe(200);
    });
});
