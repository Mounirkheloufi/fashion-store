const express = require("express");
const { register, login, getProfile, getUsers } = require("../controllers/userController");
const authMiddleware = require("../middelwares/authMiddleware");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/profile",authMiddleware, getProfile);
router.get("/", getUsers)

module.exports = router;