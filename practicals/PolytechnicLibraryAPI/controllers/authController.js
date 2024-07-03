const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getUserByUsername = async (req, res) => {
    const name = parseInt(req.params.username);
    try {
        const user = await User.getUserByUsername(name);
        if (!user) {
        return res.status(404).send("User not found");
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving user");
    }
}

const registerUser = async(req, res) => {
    const newUser = req.body;
    const username = newUser.username;
    const password = newUser.passwordHash;

    try {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({message: "Username already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        newUser.passwordHash = hashedPassword;

        await User.registerUser(newUser);

        return res.status(201).json({message: "User created successfully"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
}

const login = async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(400).json({message: "Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid credentials"})
        }

        const payload = {
            id: user.user_id,
            role: user.role,
        };
        const token = jwt.sign(payload, "your_secret_key", {expiresIn: "3600s"}); //expires in 1 hour

        return res.status(200).json({token});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    getUserByUsername,
    registerUser,
    login,
}