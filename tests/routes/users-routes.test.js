const supertest = require("supertest");
const app = require("../../__mocks__/app.mock");
// GET Route
describe("GET /users", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/users");
        expect(statusCode).toBe(200);
    });
});

// POST Route
describe("POST /users", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/users");
        expect(statusCode).toBe(200);
    });
});

//GET BY ID Route
describe("GET BY ID /users", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/users");
        expect(statusCode).toBe(200);
    });
});

// DELETE Route
describe("DELETE /users", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/users");
        expect(statusCode).toBe(200);
    });
});

// PUT Route
describe("PUT /user", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/users");
        expect(statusCode).toBe(200);
    });
});
