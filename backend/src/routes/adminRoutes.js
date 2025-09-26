const express = require("express");
const { getAdminStats } = require("../controllers/adminController");
const  authMiddleware = require("../middelwares/authMiddleware");
const  isAdmin = require("../middelwares/isAdmin");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Routes pour les administrateurs
 */

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Obtenir les statistiques générales
 *     description: Retourne le nombre de produits, utilisateurs, commandes et revenus (accessible uniquement aux admins).
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: integer
 *                   example: 120
 *                 users:
 *                   type: integer
 *                   example: 45
 *                 orders:
 *                   type: integer
 *                   example: 60
 *                 revenue:
 *                   type: number
 *                   example: 152000
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit (admin uniquement)
 */
router.get("/stats", authMiddleware, isAdmin, getAdminStats);

module.exports = router;
