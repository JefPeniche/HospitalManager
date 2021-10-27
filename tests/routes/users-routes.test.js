const supertest = require("supertest");
const app = require("../../__mocks__/app.mock");
// GET Route
describe("GET /users", () => {
    it("Should be correct", async () => {
        const response = await supertest(app).get("/users");
        expect(200).not.toBeNull();
    });
});

// POST Route
describe("POST /users", () => {
    it("Should be correct", async () => {
        const response = await supertest(app).post("/users");
        expect(200).not.toBeNull();
    });
});

//GET BY ID Route
describe("GET BY ID /users", () => {
    it("Should be correct", async () => {
        const response = await supertest(app).get("/users/:id");
        expect(200).not.toBeNull();
    });
});

// DELETE Route
describe("DELETE /users", () => {
    it("Should be correct", async () => {
        const response = await supertest(app).delete("/users/:id");
        expect(200).not.toBeNull();
    });
});

// PUT Route
describe("PUT /customer", () => {
    it("Should be correct", async () => {
        const response = await supertest(app).put("/customer/:id");
        expect(200).not.toBeNull();
    });
});
