const express = require("express");
const router = express.Router();

// Dummy user database (for now)
let users = [];

// Register a new user
router.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).json({ message: "User registered successfully", user: newUser });
});

// Login user
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user });
});

// Add new user (admin use case)
router.post("/add", (req, res) => {
    const { username, password } = req.body;
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).json({ message: "User added successfully", user: newUser });
});

// Update user by ID
router.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    const userIndex = users.findIndex(user => user.id == id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[userIndex] = { ...users[userIndex], username, password };
    res.json({ message: "User updated successfully", user: users[userIndex] });
});

// Delete user by ID
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(user => user.id == id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);
    res.json({ message: "User deleted successfully" });
});

module.exports = router;
