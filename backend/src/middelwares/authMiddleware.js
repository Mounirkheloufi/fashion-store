const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const dotenv = require("dotenv");

dotenv.config();

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined in .env");
        }

        // Vérifie et décode le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Récupère l'utilisateur depuis la DB
        const user = await User.findUserById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;
