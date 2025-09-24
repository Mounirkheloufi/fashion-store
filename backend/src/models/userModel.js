const pool = require("../config/db");

async function getAllUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
}

async function createUser({ name, email, password, role = 'user', profile_picture = null }) {
    const [result] = await pool.query(
        "INSERT INTO users (name, email, password, role, profile_picture) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, role, profile_picture]
    );
    return { id: result.insertId };
}

async function findUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}

async function findUserById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
}

module.exports = {
    getAllUsers,
    createUser,
    findUserByEmail,
    findUserById
};