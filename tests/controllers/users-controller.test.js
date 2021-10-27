const supertest = require("supertest");
const app = require("../../__mocks__/app.mock");

describe("Get all the users with GET controller", () => {
    it("Should response all the mock elements", async () => {
        const response = await supertest(app).get("/api/users");
        expect(response.body).toEqual({
            data: [
                {
                    id: 1,
                    email: "user@example.com",
                    name: "first user",
                },
                {
                    id: 2,
                    email: "user2@example.com",
                    name: "second user",
                },
            ],
        });
    });
});

describe("Create an user with POST controller", () => {
    it("Should return the new user", async () => {
        const response = await supertest(app).post("/api/users");
        expect(response.body).toEqual({
            data: {
                id: 1,
                name: "new User",
                email: "newuser@example.com",
            },
        });
    });
});

describe("Get an user by id with GET BY ID controller", () => {
    it("Should response the user", async () => {
        const response = await supertest(app).get("/api/users/2");
        expect(response.body).toEqual({
            data: {
                id: "2",
                name: "user matched",
                email: "email@example.com",
            },
        });
    });
});

describe("Delete an user with DELETE controller", () => {
    it("Should response the long of the delete", async () => {
        const response = await supertest(app).delete("/api/users/1");
        expect(response.body).toEqual({ data: "1" });
    });
});

describe("Update an user with PUT controller", () => {
    it("Should response the new user", async () => {
        const response = await supertest(app).put("/api/users/2");
        expect(response.body).toEqual({
            data: {
                id: 1,
                name: "new name",
                email: "newmail@example.com",
            },
        });
    });
});
