const UserMock = require("../../__mocks__/models/users.mock");

describe("Test sequelize mocking model User-findAll function", () => {
    it("Should get all values in the mock db", async () => {
        const users = await UserMock.findAll();
        const allCustomers = [];
        allCustomers.push(users[0].dataValues["0"]);
        allCustomers.push(users[0].dataValues["1"]);
        expect(allCustomers).toEqual([
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
        ]);
    });
});

// destroy method for Deleted by Id http request
describe("Test sequelize mocking model User-destroy function", () => {
    it("Should delete the element in the mock db", async () => {
        const user = await UserMock.destroy({
            where: {
                id: 1,
            },
        });

        expect(user).toBe(1);
    });
});

// destroy method for Get by Id http request
describe("Test sequelize mocking model User-findOne function", () => {
    it("Should return the element by id from the mock db", async () => {
        const user = await UserMock.findOne({
            where: {
                id: 1,
            },
        });
        expect(user.dataValues["0"]).toEqual({
            id: 1,
            email: "user@example.com",
            name: "first user",
        });
    });
});

// update method for post http request
describe("Test sequelize mocking model User-update function", () => {
    it("Should return [1]", async () => {
        const user = await UserMock.update([
            {
                id: 1,
                email: "new.user@example.com",
                name: "first user",
            },
        ]);
        expect(user).toEqual([1]);
    });
});

// create method for  put http request
describe("Test sequelize mocking model User-create function", () => {
    it("Should return the new user", async () => {
        const user = await UserMock.create([
            {
                id: 3,
                email: "user3@example.com",
                name: "third user",
            },
        ]);
        expect(user.dataValues["0"]).toEqual({
            id: 3,
            email: "user3@example.com",
            name: "third user",
        });
    });
});
