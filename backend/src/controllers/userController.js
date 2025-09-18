const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { signToken } = require("../utils/tokenUtils");


async function register(req, res, next) {
    try {
        const { name, email, password, profile_picture } = req.body;
        const existing = await User.findUserByEmail(email);
        if (existing) return res.status(400).json({ error: "Email already in use" });

        const hash = await bcrypt.hash(password, 10);
        const { id } = await User.createUser({ name, email, passwordHach: hash, profile_picture });
        const token = signToken({ id, email });
        res.status(201).json({ id, name, email, profile_picture, token });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findUserByEmail(email);
        console.log("🔍 User fetched from DB:", user); 
        if (!user) return res.status(401).json({ error: "Invalid email or password" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ error: "Invalid email or password" });

        const token = signToken({ id: user.id, email: user.email });
        res.json({ id: user.id, name: user.name, email: user.email, token });
    } catch (error) {
        next(error);
    }
}

async function getProfile(req, res, next) {
    try {
         if (!req.user) {
             return res.status(401).json({ error: "Unauthorized" });
         }

        res.json({
            id: req.user.id || req.user.user_id,  
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            profile_picture: req.user.profile_picture,
            created_at: req.user.created_at
        });
    } catch (error) {
        next(error);
    }
}


async function getUsers(req, res, next) {
    try {
        const user = await User.getAllUsers();
        res.json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    register,
    login,
    getProfile
};  