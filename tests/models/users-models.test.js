import UserMock from "../../__mocks__/models/users.mock";

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
