exports.create = async (req, res) => {
    const newUser = {
        id: 1,
        name: "new User",
        email: "newuser@example.com",
    };
    return res.status(200).json({ data: newUser });
};

exports.getAll = async (req, res) => {
    const allUsers = [
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
    ];
    return res.status(200).json({
        data: allUsers,
    });
};

exports.getById = async (req, res) => {
    const id = req.params.id;
    const user = {
        id: id,
        name: "user matched",
        email: "email@example.com",
    };
    return res.status(200).json({ data: user });
};

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    return res.status(200).json({ data: id });
};

exports.update = async (req, res) => {
    const user = {
        id: 1,
        name: "new name",
        email: "newmail@example.com",
    };
    return res.status(200).json({ data: user });
};
