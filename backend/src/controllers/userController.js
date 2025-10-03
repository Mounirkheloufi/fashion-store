const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { signToken } = require("../utils/tokenUtils");
const upload = require("../middelwares/upload")


async function register(req, res, next) {
  try {
    console.log("BODY ===>", req.body);
    console.log("FILE ===>", req.file);
    const { name, email, password, role } = req.body;

    // Vérifier si fichier envoyé
    let profile_picture = null;
    if (req.file) {
      profile_picture = `/uploads/${req.file.filename}`; 
    }

    // Vérifier si email existe déjà
    const existing = await User.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);

    // Créer utilisateur
    const { id } = await User.createUser({
      name,
      email,
      password: hash, 
      role: role || "user",
      profile_picture,
    });

    const token = signToken({ id, email });

    res.status(201).json({
      id,
      name,
      email,
      role: role || "user",
      profile_picture,
      token,
    });
  } catch (error) {
    console.error(error); 
    next(error);
  }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findUserByEmail(email);
        console.log(" User fetched from DB:", user); 
        if (!user) return res.status(401).json({ error: "Invalid email or password" });

        // Vérifier si compte désactivé
        if (user.is_active === 0) {
            return res.status(403).json({ error: "Account disabled. Contact admin." });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ error: "Invalid email or password" });

        const token = signToken({ id: user.id, email: user.email });
        res.json({ id: user.id, name: user.name, email: user.email, role: user.role, profile_picture: user.profile_picture, token });
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

async function updateProfile(req, res, next) {
  try {
    const userId = req.user.id; // récupéré via authMiddleware
    const { email, password } = req.body;

    let profile_picture = req.user.profile_picture;
    if (req.file) {
      profile_picture = `/uploads/${req.file.filename}`;
    }

    // Si changement de mot de passe
    let hashedPassword = req.user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await User.updateUserProfile(userId, { email, password: hashedPassword, profile_picture });

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    next(error);
  }
}


async function deleteProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const deleted = await User.deleteUser(userId);

    if (!deleted) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
    getUsers,
    register,
    login,
    getProfile,
    updateProfile,
    deleteProfile
};  