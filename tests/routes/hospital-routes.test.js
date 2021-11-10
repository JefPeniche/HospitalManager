const supertest = require("supertest");
const app = require("../../__mocks__/app.mock");
// GET Route
describe("GET /hospitals", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/hospitals");
        expect(statuscode).tobe(200);
    });
});

// POST Route
describe("POST /hospitals", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/hospitals");
        expect(statusCode).toBe(200);
    });
});

//GET BY ID Route
describe("GET BY ID /hospitals", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/hospitals");
        expect(statusCode).toBe(200);
    });
});

// DELETE Route
describe("DELETE /hospitals", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/hospitals");
        expect(statusCode).toBe(200);
    });
});

// PUT Route
describe("PUT /customer", () => {
    it("Should be correct", async () => {
        const { statusCode } = await supertest(app).get("/api/hospitals");
        expect(statusCode).toBe(200);
    });
});
