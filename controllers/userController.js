const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load users from users.json
const loadUsers = () => {
    try {
        const data = fs.readFileSync("users.json", "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Save users to users.json
const saveUsers = (users) => {
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    let users = loadUsers();

    // Check if user exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    users.push({ username, password: hashedPassword });
    saveUsers(users);

    res.status(201).json({ message: "User registered successfully" });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    // Find user
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
};

module.exports = { registerUser, loginUser };
