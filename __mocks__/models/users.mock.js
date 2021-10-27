import MockDBConnection from "../mock/mock_db";

const User = MockDBConnection.define("Users", [
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

export default User;
